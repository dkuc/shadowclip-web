import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

// @ts-ignore
import { FixedSizeList as List } from 'react-window';
import bytes from 'bytes';
import Spinner from '../spinner/Spinner';
import Badge from '../badge/Badge';

import './Table.scss';

import { Share2, ArrowUp, ArrowDown, Trash } from 'react-feather';
import IconButton from '../button/IconButton';
import EmptyState from '../emptyState/EmptyState';
import SearchBar from '../searchBar/SearchBar';
import Select from '../select/Select';
import SelectItem from '../select/SelectItem';
import Dater from '../dater/Dater';
import Toolbar from '../toolbar/Toolbar'
import ToolbarItem from '../toolbar/ToolbarItem';

interface rowProps {
  data: any
  index?: any,
  style?: any
};

//mutates the array passed in AND returns a new array to get around react caching
function removeItem(array: any[],  item: any) {
    const index = array.findIndex(i => i.name == item.name);
    if (index > -1) {
        array.splice(index, 1);
    }
    return [...array];
}

function Table() {

    const [clipData, setClipData] = useState<any[]>([]);
    // this copies ^ so we don't blow up the original
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentSortDirection, setCurrentSortDirection] = useState('desc');
    const history = useHistory();

    const GUTTER_SIZE = 25;
    const ROW_HEIGHT = 100;

    const filterResults = () => {
      let input = document.getElementById('sh-toolbar-search');
      // @ts-ignore
      let value = input.value.toUpperCase();
      setFilteredData(clipData.filter(item => item.name.toUpperCase().includes(value)));
    }

    const handleSort = (e: any) => {
      let sort = e.target.selectedIndex;
      let sortedValue = e.target.options[sort].dataset.sort;
      setCurrentSortDirection('desc');
      setFilteredData(filteredData.sort(compareValues(sortedValue, 'desc')));
      history.push(`/videos?sort_by=${sortedValue}.desc`);
    }

    const flipSort = () => {
      const currentSort = history.location.search.split('.')[0];
      const direction = currentSortDirection === 'asc' ? 'desc' : 'asc';
      setCurrentSortDirection(direction);
      setFilteredData(filteredData.reverse());
      history.push(`/videos${currentSort}.${direction}`);
    }

    function compareValues(key: any, order = 'asc') {
      return function innerSort(a: any, b: any) {
        if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
          // property doesn't exist on either object
          return 0;
        }

        const varA = (typeof a[key] === 'string')
          ? a[key].toUpperCase() : a[key];
        const varB = (typeof b[key] === 'string')
          ? b[key].toUpperCase() : b[key];

        let comparison = 0;
        if (varA > varB) {
          comparison = 1;
        } else if (varA < varB) {
          comparison = -1;
        }
        return (
          (order === 'desc') ? (comparison * -1) : comparison
        );
      };
    }

    const Row: React.FC<rowProps> = ({ index, style }) =>  {

      const copyText = (url: string) => {
        navigator.clipboard.writeText(url).then(() => console.log(`Copied ${url}`));
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
            <Link to={`/videos/${current.name }`}>
              <img alt={`${current.name}`} src={`https://shadowclip.net/thumbnails/${current.fileName}.jpg`}/>
            </Link>
          </section>
          <Link className='sh-clip-list-item__details' to={{
            pathname: `/videos/${current.name}`,
            state: current}}>
            <h3 className='sh-clip-list-item__details--title'>
              {current.name}
              <Badge className='sh-clip-list-item__details--views'>{current.views} {current.views === 1 ? 'view' : 'views'}</Badge>
            </h3>
            <span className='sh-clip-list-item__details--uploader'>Uploaded by <b>{current.uploadedBy}</b> on <Dater isBold date={current.date}/></span>
            <span className='sh-clip-list-item__details--size'> File size: { bytes(current.size) } </span>
          </Link>
          <section className='sh-clip-list-item__tools'>
            { current.canDelete && <IconButton onClick={() => {
                // start a spinner?
                fetch(`https://shadowclip.net/uploads/delete/${current.fileName}`,
                    {method: 'DELETE'}
                ).then(() => {
                    setClipData(removeItem(clipData, current))
                    setFilteredData(removeItem(filteredData, current))
                }).catch(err => console.error(err)); //throw up an error?
            }}><Trash size={20}/></IconButton>}
            <IconButton onClick={() => copyText(`${window.location.protocol}//${window.location.host}${window.location.pathname}/${current.name}`)}><Share2 size={20}/></IconButton>
          </section>
        </div>
      )
    };

    useEffect(() => {
      fetch(
        'https://shadowclip.net/api/data',
        {
          method: "GET",
          headers: new Headers({
            Accept: "application/json"
          })
        }
      )
      .then(res => res.json())
      .then(response => {
        setClipData(response);
        if(history.location.search) {
          const filters = history.location.search.split('?sort_by=')[1].split('.');
          setFilteredData(response.sort(compareValues(filters[0], filters[1])));
        } else {
          setFilteredData(response.sort(compareValues('date', 'desc')));
          history.push(`/videos?sort_by=date.desc`);
        }
        setIsLoading(false);
      })
      .catch(error => console.log(error));
  }, [ history ]);

  let valueFromURL;
  if(history.location.search) {
    valueFromURL = history.location.search.split('?sort_by=')[1].split('.')[0];
  } else {
    valueFromURL = 'date'
  };

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
                  <SelectItem value='name'> Name </SelectItem>
                  <SelectItem value='views'> Views </SelectItem>
                  <SelectItem value='date'> Date </SelectItem>
                  <SelectItem value='size'> Size </SelectItem>
                  <SelectItem value='uploadedBy'> Uploaded by </SelectItem>
                </Select>
                <IconButton onClick={()=> flipSort()}>
                  { currentSortDirection === 'asc'
                    ? <ArrowUp/>
                    : <ArrowDown/>
                  }
                </IconButton>
              </ToolbarItem>
            </Toolbar>
            { filteredData.length
              ? <List
                className='sh-clip-list'
                height={700}
                itemCount={filteredData.length}
                itemSize={ROW_HEIGHT + GUTTER_SIZE}
                width={'100%'}>
                {Row}
              </List>
              : <EmptyState/>
            }
      </React.Fragment>
      }
    </React.Fragment>
  )
}

export default Table;