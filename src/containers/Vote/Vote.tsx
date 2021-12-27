import React, { useEffect, useState } from 'react'
import styles from './Vote.module.css'
import { ProgressSpinner } from 'primereact/progressspinner'
import { IImage } from '../../models/image.model'
import axios from '../../axios-votes'
import Logo from '../../components/Logo/Logo'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { RouteComponentProps } from 'react-router'

const Vote = (props: RouteComponentProps) => {
  // Array of Images
  const [images, setImages] = useState<IImage[]>([])
  const [loading, setLoading] = useState(true)
  const [voted, setVoted] = useState(false)
  const [votesNbr, setVotesNbr] = useState(0)

  useEffect(() => {
    // Getting images with axios
    axios
      .get('/cats.json')
      .then((res) => {
        const shuffledImages: IImage[] = res.data.images.sort(
          (a: {}, b: {}) => 0.5 - Math.random(),
        )
        setImages(shuffledImages)
        setLoading(false)
      })
      .catch((err) => {});
      getVotesNbr();
  }, [])

  // Shuffle the state of images array
  const shuffleImages = () => {
    const shuffledArray = [...images].sort(
      (a: {}, b: {}) => 0.5 - Math.random(),
    )
    setImages(shuffledArray)
    setVoted(false)
  }

  // Getting votes number from firebase
  const getVotesNbr = () => {
    axios
      .get('/cats.json')
      .then((res) => {
        setVotesNbr(res.data.totalVoteNbr)
      })
      .catch((err) => {})
  }

  // Vote method
  const vote = (id: string) => {
    setVoted(true)
    const upsertData = {
      [id]: { vote: { '.sv': { increment: 1 } } },
      totalVoteNbr: { '.sv': { increment: 1 } },
    }
    axios
      .patch(`/cats.json`, upsertData)
      .then((res) => {
        shuffleImages()
        getVotesNbr()
      })
      .catch((err) => {
        setVoted(false)
      });
  }

  return (
    <React.Fragment>
      <h2 className={`${styles['middle-text']} ${styles.h2}`}>Choose</h2>
      <Logo />
      <div className={styles['vote-left-div']}>
        {loading ? (
          <ProgressSpinner />
        ) : (
          <img
            style={voted ? { pointerEvents: 'none' } : {}}
            onClick={() => vote(images[0].id)}
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
            style={voted ? { pointerEvents: 'none' } : {}}
            onClick={() => vote(images[1].id)}
            src={images[1].url}
            alt="right cat"
            className={`${styles['picture-frame']} ${styles['right-picture-frame']}`}
          />
        )}
      </div>
      <div
        onClick={() => props.history.push('/ranking')}
        className={`${styles['middle-text']} ${styles['bottom-div']}`}
      >
        <p className={styles.p}>Cutest cats ranking</p>
        <span className={styles.span}>{votesNbr} votes</span>
      </div>
    </React.Fragment>
  )
}

export default withErrorHandler(Vote, axios)
