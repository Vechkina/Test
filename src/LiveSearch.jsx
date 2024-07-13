import { useState, useEffect, useCallback } from "react";


function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}


export const LiveSearch = () => {
  const [val, setVal] = useState('');
  const [response, setResponse] = useState('');
  const debouncedValue = useDebounce(val, 1000);


  function search (query){
    try {
      fetch(`https://jsonplaceholder.typicode.com/todos?query=${query}`)
          .then(response => response.json())
          .then(json => setResponse(json))
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    search(debouncedValue)
  }, [debouncedValue])

  const onChange = useCallback( (e) => {
      setVal(e.target.value)
  }, []
)

  const onReccomendationClick = (title) => {
      console.log(title)
  }


  return(
      <div>
          <input value={val} onChange={onChange} type="text"/>
          <Reccomendations onClick={onReccomendationClick} response={response} />
      </div>
  )
}

export const Reccomendations = ({onClick, response}) => {
  console.log(response)
  return (
    <button>button</button>
  )
}
