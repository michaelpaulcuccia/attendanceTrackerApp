import React, {useState} from 'react';
import StudentTable from './Components/StudentTable';
import ClassTable from './Components/ClassTable';

const App = () => {

  const [showStudent, setShowStudent] = useState(false);
  const [showClass, setShowClass] = useState(false);

  const handleShowStudent = () => {
    setShowStudent(!showStudent)
  };

  const handleShowClass = () => {
    setShowClass(!showClass)
  };

  return (
    <div className="App">
      <button onClick={handleShowStudent}>Show Student Table</button>
      {showStudent && <StudentTable />}
      <br></br>
      <button onClick={handleShowClass}>Show Class Table</button>
      {showClass && <ClassTable />}
    </div>
  );
}

export default App;
