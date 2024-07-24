import {
    Container, 
    TipoText,
    Tipo,
    IconView,
    ValorText
  } from './styles';

import Icon from "react-native-vector-icons/Feather";

function HistoricList({ data }) {
  return (
    <Container>
      
    <Tipo>
      <IconView tipo={data.type}>
        <Icon 
          name={data.type === 'despesa' ? 'arrow-down' : 'arrow-up'}
          size={20} 
          color="#FFF" 
        />
        <TipoText>{data.type}</TipoText>
      </IconView>
    </Tipo>

    <ValorText>
      R$ {data.value}
    </ValorText>

  </Container>
  );
}

export default HistoricList;
