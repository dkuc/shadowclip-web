import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {ApolloClient, gql, InMemoryCache, useQuery} from '@apollo/client';

// @ts-ignore
import {FixedSizeList as List} from 'react-window';
import InfiniteLoader from "react-window-infinite-loader";
import bytes from 'bytes';
import Spinner from '../spinner/Spinner';
import Badge from '../badge/Badge';

import './Table.scss';

import {ArrowDown, ArrowUp, Share2, Trash} from 'react-feather';
import IconButton from '../button/IconButton';
import EmptyState from '../emptyState/EmptyState';
import SearchBar from '../searchBar/SearchBar';
import Select from '../select/Select';
import SelectItem from '../select/SelectItem';
import Dater from '../dater/Dater';
import Toolbar from '../toolbar/Toolbar'
import ToolbarItem from '../toolbar/ToolbarItem';
import {offsetLimitPagination} from "@apollo/client/utilities";

const client = new ApolloClient({
    uri: 'https://beta.shadowclip.net/graphql',
    cache: new InMemoryCache({
        typePolicies: {
            Query: {
                fields: {
                    videosList: offsetLimitPagination(),
                },
            },
        },
    })
});

interface rowProps {
  data: any
  index?: any,
  style?: any
};


const VIDEOS_QUERY = gql`
    query GetVideos(
      $orderBy: [VideosOrderBy!] = CREATED_AT_DESC
      $searchText: String
      $offset: Int!
    ) {
      videosList(
        orderBy: $orderBy
        searchText: $searchText
        first: 10
        offset: $offset
      ) {
        id
        canDelete
        createdAt
        fileSize
        thumbnailUrl
        title
        userHash
        views
      }
      videos {
        totalCount
      }
    }
`;
const DELETE_QUERY = gql`
    mutation DeleteVideo($id: Int!) {
      deleteVideo(input: {id: $id}) {
        deletedVideoNodeId
      }
    }
`;
function Table() {
    const [currentSortDirection, setCurrentSortDirection] = useState('DESC');
    const [currentSort, setCurrentSort] = useState('CREATED_AT');
    const [searchText, setSearchText] = useState();
    const variables = {
        orderBy:`${currentSort}_${currentSortDirection}`,
        offset: 0,
        searchText
    };
    const {
        data,
        loading:isLoading,
        fetchMore,
        refetch
    } = useQuery(VIDEOS_QUERY, {
        client,
        variables
    });
    useEffect(() => {
        if(isLoading) return //If the initial load is still going, do not refresh a 2nd time
        client.resetStore().then(()=>refetch({
            orderBy:`${currentSort}_${currentSortDirection}`,
            offset: 0,
            searchText
        }));
    }, [currentSortDirection, currentSort, searchText]);


    const filteredData = data ? data.videosList : [];
    const loadedItemCount = filteredData.length;

    const history = useHistory();

    const GUTTER_SIZE = 25;
    const ROW_HEIGHT = 100;

    const filterResults = () => {
        const input = document.getElementById('sh-toolbar-search');
        // @ts-ignore
        setSearchText(input.value)
    }

    const handleSort = (e: any) => {
      let sort = e.target.selectedIndex;
      let sortedValue = e.target.options[sort].dataset.sort;
      setCurrentSort(sortedValue);
      setCurrentSortDirection('DESC');
      history.push(`/videos?sort_by=${sortedValue}.DESC`);
    }

    const flipSort = () => {
      const currentSort = history.location.search.split('.')[0];
      const direction = currentSortDirection === 'ASC' ? 'DESC' : 'ASC';
      setCurrentSortDirection(direction);
      history.push(`/videos${currentSort}.${direction}`);
    }

    const Row: React.FC<rowProps> = ({ index, style }) =>  {

      const copyText = (url: string) => {
        navigator.clipboard.writeText(url).then(() => console.log(`Copied ${url}`));
      }

      if(!isItemLoaded(index)){
          return (
              <div> </div>
          )
      }
      const current = filteredData[index];

      return(
        <div className='sh-clip-list-item' key={index} style={{
          ...style,
          top: style.top + GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
          width: style.width - GUTTER_SIZE
        }} >
          <section className='sh-clip-list-item__image'>
            <Link to={`/videos/${current.title }`}>
              <img alt={`${current.title}`} src={`${current.thumbnailUrl}`}/>
            </Link>
          </section>
          <Link className='sh-clip-list-item__details' to={{
            pathname: `/videos/${current.title}`,
            state: current}}>
            <h3 className='sh-clip-list-item__details--title'>
              {current.title}
              <Badge className='sh-clip-list-item__details--views'>{current.views} {current.views === 1 ? 'view' : 'views'}</Badge>
            </h3>
            <span className='sh-clip-list-item__details--uploader'>Uploaded by <b>{current.userHash}</b> on <Dater isBold createdAt={current.createdAt}/></span>
            <span className='sh-clip-list-item__details--size'> File size: { bytes(current.fileSize) } </span>
          </Link>
          <section className='sh-clip-list-item__tools'>
            { current.canDelete && <IconButton onClick={() => {
                // start a spinner?
                client.mutate({mutation: DELETE_QUERY, variables: {id: current.id}})
                    .then(() => {
                        refetch({
                            orderBy: `${currentSort}_${currentSortDirection}`,
                            searchText
                        })
                    }).catch(err => console.error(err)); //throw up an error?
            }}><Trash size={20}/></IconButton>}
            <IconButton onClick={() => copyText(`${window.location.protocol}//${window.location.host}${window.location.pathname}/${current.title}`)}><Share2 size={20}/></IconButton>
          </section>
        </div>
      )
    };


  let valueFromURL;
  if(history.location.search) {
    valueFromURL = history.location.search.split('?sort_by=')[1].split('.')[0];
  } else {
    valueFromURL = 'CREATED_AT'
  }

    function isItemLoaded(index: number) {
        return index < loadedItemCount;
    }

    function loadMoreItems(startIndex: number, stopIndex: number) {
      return fetchMore({variables: {offset: loadedItemCount}})
    }

    return (
    <React.Fragment>
      { isLoading
        ? <Spinner/>
        : <React.Fragment>
            <Toolbar>
              <ToolbarItem>
                <SearchBar id='sh-toolbar-search' label='Search' placeHolder='Search for video' onChange={filterResults}/>
              </ToolbarItem>
              <ToolbarItem className='sh-toolbar-sort-wrapper'>
                <Select id='sh-toolbar-sort' onChange={handleSort} defaultValue={valueFromURL} label='Sort by'>
                  <SelectItem value='TITLE'> Name </SelectItem>
                  <SelectItem value='VIEWS'> Views </SelectItem>
                  <SelectItem value='CREATED_AT'> Date </SelectItem>
                  <SelectItem value='FILE_SIZE'> Size </SelectItem>
                  <SelectItem value='USER_HASH'> Uploaded by </SelectItem>
                </Select>
                <IconButton onClick={()=> flipSort()}>
                  { currentSortDirection === 'ASC'
                    ? <ArrowUp/>
                    : <ArrowDown/>
                  }
                </IconButton>
              </ToolbarItem>
            </Toolbar>
            { loadedItemCount
                ? <InfiniteLoader
                    isItemLoaded={isItemLoaded}
                    itemCount={loadedItemCount + 1}
                    loadMoreItems={loadMoreItems}
                    threshold={1}
                >
                    {({onItemsRendered, ref}) => (
                        <List
                            className='sh-clip-list'
                            height={700}
                            itemCount={loadedItemCount + 1}
                            itemSize={ROW_HEIGHT + GUTTER_SIZE}
                            onItemsRendered={onItemsRendered}
                            ref={ref}
                            width={'100%'}>
                            {Row}
                        </List>
                    )}
                </InfiniteLoader>
                : <EmptyState/>
            }
      </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Table;