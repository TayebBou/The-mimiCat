import React, { useEffect, useState } from 'react';
import styles from './Vote.module.css';
import axios from 'axios';
import { ProgressSpinner } from 'primereact/progressspinner';
import { IImage } from '../../models/image.model';

const Vote = () => {
    // Array of Images
  const [images, setImages] = useState<IImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
      // Getting images with axios
    axios.get('/cats.json').then((res) => {
      const shuffledImages: IImage[] = res.data.images.sort((a: {}, b: {}) => 0.5 - Math.random())
      setImages(shuffledImages);
      setLoading(false);
    });
  }, [])

    // Shuffle the state of images array
  const shuffleImages = () => {
    const shuffledArray = [...images].sort((a: {}, b: {}) => 0.5 - Math.random());
    setImages(shuffledArray);
  }

  return (
    <React.Fragment>
      <div className={styles['vote-left-div']}>
        {loading ? (
          <ProgressSpinner />
        ) : (
          <img
            onClick={() => shuffleImages()}
            src={images[0].url}
            alt="left cat"
            className={`${styles['picture-frame']} ${styles['left-picture-frame']}`}
          />
        )}
      </div>
      <div className={styles['vote-right-div']}>
        {loading ? (
          <ProgressSpinner />
        ) : (
          <img
              onClick={() => shuffleImages()}
              src={images[1].url}
              alt="right cat"
              className={`${styles['picture-frame']} ${styles['right-picture-frame']}`}
          />
        )}
      </div>
    </React.Fragment>
  )
}

export default Vote
