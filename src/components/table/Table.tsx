import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// @ts-ignore
import { FixedSizeList as List } from 'react-window';
import bytes from 'bytes';
import Spinner from '../spinner/Spinner';
import Badge from '../badge/Badge';

import './Table.scss';
import './TableToolbar.scss';

import { Share2, Filter } from 'react-feather';
import IconButton from '../button/IconButton';
import EmptyState from '../emptyState/EmptyState';

interface rowProps {
  data: any
  index?: any,
  style?: any
};

function Table() {

    const [clipData, setClipData] = useState<any[]>([]);
    const [filteredData, setFilteredData] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const GUTTER_SIZE = 25;
    const ROW_HEIGHT = 100;

    const filterResults = () => {
      let input = document.getElementById('sh-toolbar-search');
      // @ts-ignore
      let value = input.value;

      setFilteredData(clipData.filter(item => item.name.includes(value)));
      console.log(filteredData);
    }
    
    const Row: React.FC<rowProps> = ({ index, style }) =>  {

      const dateOptions = {
        year: 'numeric', month: 'numeric', day: 'numeric',
        hour: 'numeric', minute: 'numeric', second: 'numeric',
        hour12: true,
      };
      const date = new Intl.DateTimeFormat('default', dateOptions).format(new Date(filteredData[index].date));

      const copyText = (url: string) => {
        navigator.clipboard.writeText(url).then(() => console.log(`Copied ${url}`));
      }

      return(
        <div className='sh-clip-list-item' key={index} style={{
          ...style,
          top: style.top + GUTTER_SIZE,
          height: style.height - GUTTER_SIZE,
          width: style.width - GUTTER_SIZE
        }} >
          <section className='sh-clip-list-item__image'>
            <Link to={`/videos/${ filteredData[index].fileName }`}>
              <img alt='TODO alt text' src={`https://shadowclip.net/thumbnails/${filteredData[index].fileName}.jpg`}/>
            </Link>
          </section>
          <Link className='sh-clip-list-item__details' to={`/videos/${ filteredData[index].fileName }`}>
            <h3 className='sh-clip-list-item__details--title'>
              { filteredData[index].name }
              <Badge className='sh-clip-list-item__details--views'>{ filteredData[index].views } { filteredData[index].views === 1 ? 'view' : 'views' }</Badge>
            </h3>
            <span className='sh-clip-list-item__details--uploader'>Uploaded by <b>{ filteredData[index].uploadedBy }</b> on <b>{date}</b></span>
            <span className='sh-clip-list-item__details--size'> File size: { bytes(filteredData[index].size) } </span>
          </Link>
          <section className='sh-clip-list-item__tools'>
            <IconButton onClick={() => copyText(`${window.location.href}/${ filteredData[index].fileName }`)}><Share2/></IconButton>
          </section>
        </div>
      )
    };

    useEffect(() => {
      fetch(
        "shadowclipdata.json",
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
          setFilteredData(response);
          setIsLoading(false);
        })
        .catch(error => console.log(error));
  }, []);

  return (
    <React.Fragment>
      { isLoading
        ? <Spinner/>
        : <React.Fragment>
            <div className='sh-toolbar'>
              <input
                type='text'
                id='sh-toolbar-search'
                className='sh-toolbar-search'
                placeholder='Search for video'
                onKeyUp={filterResults}/>
                <IconButton onClick={() => console.log('TODO')}><Filter/></IconButton>
            </div>
            { filteredData.length
              ? <List
                className='sh-clip-list'
                height={750}
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