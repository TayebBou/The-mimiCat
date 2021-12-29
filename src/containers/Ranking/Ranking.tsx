import React, { useEffect, useState } from 'react'
import axios from '../../axios-votes'
import styles from './Ranking.module.css'
import { IImage } from '../../models/image.model'
import { IRankedArray } from '../../models/rankedArray.model'
import { ProgressSpinner } from 'primereact/progressspinner'
import { Paginator, PaginatorPageState } from 'primereact/paginator'
import './Ranking.sass'
import Logo from '../../components/Logo/Logo'
import backImage from '../../assets/images/arrow.png'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { RouteComponentProps } from 'react-router'
import meow from '../../assets/audio/meow.mp3'
import firstMedal from '../../assets/images/medal-first.png'
import secondMedal from '../../assets/images/medal-second.png'
import thirdMedal from '../../assets/images/medal-third.png'
import medal from '../../assets/images/medal.png'
import trophy from '../../assets/images/trophy.png'

const Ranking = (props: RouteComponentProps) => {
  const [rankedArray, setRankedArray] = useState<IRankedArray[]>([])
  const [rankedArrayFetched, setRankedArrayFetched] = useState<IRankedArray[]>([])
  const [images, setImages] = useState<IImage[]>([])
  const [loading, setLoading] = useState(true)
  const [basicFirst, setBasicFirst] = useState(0)
  const [basicRows, setBasicRows] = useState(10)
  const audio = new Audio(meow);

  useEffect(() => {
    // Getting images with axios
    axios
      .get('/cats.json')
      .then((res) => {
        setImages(res.data.images)
        setLoading(false)
      })
      .catch((err) => {})
    rankCats()
  }, [])

  const onBasicPageChange = (event: PaginatorPageState) => {
    setBasicFirst(event.first)
    setBasicRows(event.rows)
    setRankedArrayFetched(
      [...rankedArray].slice(event.first, event.first + event.rows),
    )
  }

  // create the ranked array and sort it in descending order
  const rankCats = () => {
    axios
      .get('/cats.json')
      .then((res) => {
        const VotesNbr = res.data.totalVoteNbr
        const catArrayRanked: { id: string; rank: number }[] = []
        // convert object to key's array
        const keys = Object.keys(res.data).filter((a) => a !== 'totalVoteNbr' && a !== 'images')
        keys.map(
          (i: string, j: number) =>
            (catArrayRanked[j] = {
              id: i,
              // Calcul rank
              rank: parseFloat(
                ((res.data[i].vote / VotesNbr) * 100).toFixed(2),
              ),
            }),
        )
        const sortedArray = [...catArrayRanked].sort((a, b) => b.rank - a.rank)
        setRankedArray(sortedArray)
        setRankedArrayFetched([...sortedArray].slice(0, 10))
      })
      .catch((err) => {})
  }

  const catsRanked = rankedArrayFetched.map((i: IRankedArray, j: number) => {
    const urlImage = images.find((a) => a.id === i.id)
    const frameRankStyle = () => {
      if (basicFirst === 0) {
        switch (j) {
          case 0:
            return 'first-rank'
          case 1:
            return 'second-rank'
          case 2:
            return 'third-rank'
          default:
            return 'others-rank'
        }
      } else {
        return 'others-rank'
      }
    }
    return (
      <div key={i.id + "-div"}>
        <img
          onClick={() => audio.play()}
          key={i.id}
          src={urlImage?.url}
          alt={`cat number ${j + 1}`}
          className={`${styles['picture-frame']} ${
            styles[`${frameRankStyle()}`]
          }`}
        />
        <div
          key={i.id + "-rank"}
          className={`${styles['div-rank']} ${
            basicFirst === 0 ? styles[frameRankStyle() + '-score'] : styles['others-rank-score']
          }`}
        >
          {i.rank} %
        </div>
      </div>
    )
  })

  return (
    <React.Fragment>
      <div className={styles.div}>
        <div
          onClick={() => props.history.goBack()}
          className={basicFirst === 0 ? styles['div-back'] : styles['div-back-other-pages']}
        >
          <img src={backImage} alt="back arrow" className={styles.img} />
        </div>
        {basicFirst === 0 ? (
          <div className={styles['div-podium']}>
            <div className="container">
              <div className="sky">
                <div className="stars"></div>
                <div className="stars1"></div>
                <div className="stars2"></div>
                <div className="shooting-stars"></div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ height: '52vh', width: '100%' }}>
            <Logo />
          </div>
        )}
        {loading ? (
          <div style={{ height: '100vh', width: '100%' }}>
            <ProgressSpinner />
          </div>
        ) : (
          <React.Fragment>
            {basicFirst === 0 && (
              <React.Fragment>
                <img src={firstMedal} alt="first-medal" className={styles['first-medal']}/>
                <img src={secondMedal} alt="second-medal" className={styles['second-medal']}/>
                <img src={thirdMedal} alt="third-medal" className={styles['third-medal']}/>
                <img src={medal} alt="medal" className={styles['medal-one']}/>
                <img src={medal} alt="medal" className={styles['medal-two']}/>
                <img src={trophy} alt="trophy" className={styles.trophy}/>
              </React.Fragment>
            )}
            {catsRanked}
          </React.Fragment>
        )}
        <Paginator
          className={styles['p-paginator']}
          first={basicFirst}
          rows={basicRows}
          totalRecords={rankedArray.length - 3}
          rowsPerPageOptions={[5, 10, 20, 30, 50]}
          onPageChange={onBasicPageChange}
        ></Paginator>
      </div>
    </React.Fragment>
  )
}

export default withErrorHandler(Ranking, axios)
