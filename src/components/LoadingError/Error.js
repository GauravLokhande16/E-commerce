

const Message = ({ variant, children }) =>{
  return (
      <div className={`alert ${variant} text-center `} style={{width:"100%"}}>
          {children}
      </div>
  )
}

Message.defaultProps = {
  variant : 'alert-info'
}

export default Message;