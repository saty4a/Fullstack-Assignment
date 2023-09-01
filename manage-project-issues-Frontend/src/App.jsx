import { useEffect, useState } from 'react';
import './App.css';
import Header from './Pages/Header';
import InputForms from './Pages/InputPage';
import IssuesPage from './Pages/IssuesPage';
import { getData } from './Apicalls/getData';

function App() {
  const [showData, setShowData] = useState(false);
  const [dataIssues, setDataIssues] = useState();

  useEffect(() => {
    getData().then((data) => {
      setDataIssues(data);
    });
  },[showData], setDataIssues, dataIssues)

  return (
    <div className="App">
      <Header showData={showData} setShowData={setShowData} />
      { showData ? <InputForms setShowData={setShowData} />: <IssuesPage dataIssues={dataIssues} setDataIssues={setDataIssues} /> }
    </div>
  );
}

export default App;
