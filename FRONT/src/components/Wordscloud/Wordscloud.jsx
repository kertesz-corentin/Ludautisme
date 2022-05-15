import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import './wordscloud.scss';
import { TagCloud } from 'react-tagcloud'

const data = [
    { value: 'tout handicap', count: 90 },
    { value: 'échange', count: 85 },
    { value: 'partage', count: 80 },
    { value: 'aidants', count: 78 },
    { value: 'famille', count: 75 },
    { value: 'convivialité', count: 70 },
    { value: 'particularités', count: 70 },
    { value: 'formation', count: 70 },
    { value: 'autonomie', count: 70 },
    { value: 'motricité', count: 70 },
    { value: 'échange', count: 65 },
    { value: 'soutien', count: 65 },
    { value: 'documentation', count: 65 },
    { value: 'language', count: 60 },
    { value: 'information', count:60 },
    { value: 'communication', count: 60 },
    { value: 'sensoriel', count: 60 },
    { value: 'emprunt', count: 55 },
    { value: 'difficultés au quotidien', count: 70 },
    { value: 'matériel adapté', count: 50 },
    { value: 'outils pédagogiques', count: 50 },
    { value: 'gestion des émotions', count: 50 },
  ]
const Wordscloud = ({className, ...rest}) => {
    return (

        <div
             className={classnames('wordscloud', className)}
             {...rest}
          >
              <TagCloud
     minSize={25}
     maxSize={40}
     tags={data}
     className="simple-cloud"
     // onClick={(tag) => alert(`'${tag.value}' was selected!`)}
   />

         </div>
    );
 };

 Wordscloud.propTypes = {
    className: PropTypes.string,
};
Wordscloud.defaultProps = {
    className: '',
};
export default React.memo(Wordscloud);

