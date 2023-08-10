import style from '../styles/Setter.module.css';


function Setter(props) {
    const value = props.value;

    return (
        <div className={style.setter}>
            <button className={style.btn}> + </button>
            <p className="value">{value}</p>
            <button className={style.btn}> - </button>
        </div>
    )
}

export default Setter