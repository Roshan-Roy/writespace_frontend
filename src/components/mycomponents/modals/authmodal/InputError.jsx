const InputError = ({ message = "" }) => {
    return (
        message ? <p className="text-xs mb-2.5 mt-1 text-destructive">{message}</p> : <div className="h-3.5"></div>
    )
}

export default InputError