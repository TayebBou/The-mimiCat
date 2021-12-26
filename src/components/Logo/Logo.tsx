import styles from './Logo.module.css';
import catLogo from '../../assets/images/cat.png';

const Logo = ({ style, textStyle }: { style?: {}; textStyle?: {} }) => (
  <div className={styles['div-center']} style={style}>
    <p style={textStyle}>
      <strong className={styles.strong}>
        <span className={styles['big-text']}>T</span>
        <span className={styles['small-text-up']}>he <br /></span>
        <span className={styles['small-text-down']}>mimiCat</span>
      </strong>
    </p>
    <img src={catLogo} alt="cat logo" className={styles.img} />
  </div>
)

export default Logo;
