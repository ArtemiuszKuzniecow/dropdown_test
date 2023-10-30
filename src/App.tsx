import React from 'react';
import DropDownList from './ui/DropDownList';
import dataMoscow from './dataMoscow.json';
import dataWarsaw from './dataWarsaw.json';
import dataNewYork from './dataNewYork.json';
import dataCopenhagen from './dataCopenhagen.json';
import Headline from './ui/Headlines/Headline';
import { DropDownData } from './types';

function App() {
  const [moscowData, setMoscowData] = React.useState<DropDownData[]>(dataMoscow);
  const [warsawData, setWarsawData] = React.useState<DropDownData[]>(dataWarsaw);
  const [newYorkData, setNewYorkData] = React.useState<DropDownData[]>(dataNewYork);
  const [copenhagenData, setCopenhagenData] = React.useState<DropDownData>(dataCopenhagen);

  return (
    <>
      <Headline>Expaple for Moscow</Headline>
      <DropDownList
        data={moscowData}
        isMultiselect
        callback={(data) => setMoscowData(data as DropDownData[])} />
      <Headline>Expaple for Copenhagen</Headline>
      <DropDownList
        data={copenhagenData}
        isMultiselect={false}
        callback={(data) => setCopenhagenData(data as DropDownData)} />
      <Headline>Expaple for Warsaw</Headline>
      <DropDownList
        data={warsawData}
        isMultiselect
        callback={(data) => setWarsawData(data as DropDownData[])} />
      <Headline>Expaple for New York City</Headline>
      <DropDownList
        data={newYorkData}
        isMultiselect
        callback={(data) => setNewYorkData(data as DropDownData[])} />
    </>
  );
}

export default App;
