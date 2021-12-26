import styles from './PageNotFound.module.css'
import { Button } from 'primereact/button'
import { RouteComponentProps, withRouter } from 'react-router-dom'
import Logo from '../../Logo/Logo'

const PageNotFound = (props: RouteComponentProps) => (
  <div className={styles.div}>
    <Logo />
    <h2 className={`${styles['middle-vertical']} ${styles.h2}`}>
      The page does not exist.
    </h2>
    <p className={`${styles['middle-vertical']} ${styles.p}`}>
      Check if the link you are trying to open is correct.
    </p>
    <div className={`${styles['middle-vertical']} ${styles['div-buttons']}`}>
      <Button
        className={`p-button-raised p-button-secondary ${styles['left-button']}`}
        onClick={() => props.history.goBack()}
        label="Return"
        icon="pi pi-arrow-left"
      />
      <Button
        onClick={() => props.history.push('/vote')}
        label="Back to the homepage"
        className={`p-button-raised p-button-secondary p-button-outlined ${styles['right-button']}`}
        icon="pi pi-home"
      />
    </div>
  </div>
)

export default withRouter(PageNotFound)
