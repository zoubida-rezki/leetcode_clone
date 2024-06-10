
'use client';
import axios from 'axios';
import React, { useState, useCallback, useEffect } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { python } from '@codemirror/lang-python';
import { dracula } from '@uiw/codemirror-theme-dracula';

export default function App() {
  const [code, setCode] = useState("print()");
  const [testCases, setTestCases] = useState([]);


  const onChange = useCallback((value, viewUpdate) => {
    setCode(value); // Update the state with the new value
  }, []);

  useEffect(() => {
    console.log(code); // Log the updated code value whenever it changes
  }, [code]);

  const submitCode = () => {
    axios.post('http://localhost:80/python', { code })
      .then(({data}) => {
        // console.log(data)
        setTestCases([data.passOrFail])
    });
      
  }

  return (
    <div>
      <div>make a function to add to values</div>
      {testCases.map((testCase, i) =>{
        return( 
            <div key={i}>
             <div>
            {testCase}
            </div>
            </div>);
      })}
      <CodeMirror
        value={code} // The initial Python code
        height="200px"
        theme={dracula}
        extensions={[python()]} // Ensure the function is called
        onChange={onChange} // Callback to handle changes
      />
      <div className="border-2 bg-green-500" onClick={submitCode}>submit</div>
    </div>
  );
}
