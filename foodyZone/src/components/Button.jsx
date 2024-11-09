
const Button = ({value,buttonFilter,clickedButton,setClickedButton}) => {
 
  function click (value){
    buttonFilter(value)
    setClickedButton(value)    
  }
  return (
        <button onClick = {()=> buttonFilter && click(value)}  className={`px-4 py-2  text-[12px] rounded-lg ${clickedButton == value ? 'bg-white text-black' : 'bg-red-600 text-white'} `}>{value}</button>
    )
}

export default Button