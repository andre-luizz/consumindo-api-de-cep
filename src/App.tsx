import React from 'react';

import findCEP from 'cep-promise';

interface IAddress {
  city: string;
  neighborhood: string;
  state: string;
  street: string;
}

const App: React.FC = () => {

  const [zipCodeInputValue, setZipCodeInputValue] = React.useState<string>('');
  const [address, setAddress] = React.useState<IAddress>({} as IAddress);

  const handleZipCodeInputChange = React.useCallback((event: any) => {
    setZipCodeInputValue(event.target.value);
  }, [])

  const getAddress = React.useCallback(async () => {
    const data = await findCEP(zipCodeInputValue);

    setAddress(data);
  }, [zipCodeInputValue])


  return (
    <div>
      <h1>Consulta de CEP</h1>
      <div style={{ display: 'flex', flexDirection: 'column' }} >
        <label>Digite seu CEP</label>
        <input
          style={{ width: 400, marginBottom: 30 }}
          type="text"
          name="zip_code"
          value={zipCodeInputValue}
          onChange={handleZipCodeInputChange}
        />

        <label>Cidade</label>
        <input type="text" defaultValue={address.city} disabled  style={{ width: 400 }} />

        <label>Bairro</label>
        <input type="text" defaultValue={address.neighborhood} disabled style={{ width: 400 }} />

        <label>Estado</label>
        <input type="text" defaultValue={address.state} disabled style={{ width: 400 }} />

        <label>Rua</label>
        <input type="text" defaultValue={address.street} disabled style={{ width: 400, marginBottom: 30 }} />
      </div>

      <button onClick={getAddress}>consultar</button>
    </div>
  );
}

export default App;
