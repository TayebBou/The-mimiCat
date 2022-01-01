import React, { useCallback, useEffect } from 'react'
import styles from './Vote.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { voteActions } from '../../config/stateSlices/voteSlice';
import { ProgressSpinner } from 'primereact/progressspinner'
import { IImage } from '../../shared/models/image.model'
import axios from '../../axios-votes'
import Logo from '../../components/Logo/Logo'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { RouteComponentProps } from 'react-router'
import meow from '../../assets/audio/meow.mp3'
import { IRootState } from '../../shared/models/rootState.model';

const Vote = (props: RouteComponentProps) => {
  const dispatch = useDispatch();
  // Array of Images
  const images:IImage[] = useSelector((state:IRootState) => state.vote.images)
  const loading:boolean = useSelector((state:IRootState) => state.vote.loading)
  const voted:boolean = useSelector((state:IRootState) => state.vote.voted)
  const votesNbr:number = useSelector((state:IRootState) => state.vote.votesNbr)
  const catIndex:number[] = useSelector((state:IRootState) => state.vote.catIndex)
  const audio = new Audio(meow);

  // Getting votes number from firebase
  const getVotesNbr = useCallback(() => {
    axios
      .get('/cats.json')
      .then((res) => {
        dispatch(voteActions.setVotesNbr(res.data.totalVoteNbr))
      })
      .catch((err) => {})
  },[dispatch])

  useEffect(() => {
    // Getting images with axios
    axios
      .get('/cats.json')
      .then((res) => {
        dispatch(voteActions.setImages(res.data.images))
        dispatch(voteActions.shuffleImages())
        dispatch(voteActions.stopLoading())
      })
      .catch((err) => {});
      getVotesNbr();
  }, [dispatch, getVotesNbr])

  // Vote method
  const vote = (id: string) => {
    dispatch(voteActions.setVoted(true))
    const upsertData = {
      [id]: { vote: { '.sv': { increment: 1 } } },
      totalVoteNbr: { '.sv': { increment: 1 } },
    }
    axios
      .patch(`/cats.json`, upsertData)
      .then((res) => {
        dispatch(voteActions.shuffleImages())
        getVotesNbr()
        dispatch(voteActions.setVoted(false))
      })
      .catch((err) => {
        dispatch(voteActions.setVoted(false))
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
            onClick={() => vote(images[catIndex[0]].id)}
            src={images[catIndex[0]].url}
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
            onClick={() => vote(images[catIndex[1]].id)}
            src={images[catIndex[1]].url}
            alt="right cat"
            className={`${styles['picture-frame']} ${styles['right-picture-frame']}`}
          />
        )}
      </div>
      <div
        onClick={() => {audio.play(); props.history.push('/ranking')}}
        className={`${styles['middle-text']} ${styles['bottom-div']}`}
      >
        <p className={styles.p}>Cutest cats ranking</p>
        <span className={styles.span}>{votesNbr} votes</span>
      </div>
    </React.Fragment>
  )
}

export default withErrorHandler(Vote, axios)
