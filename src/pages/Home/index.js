import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

import api from "../../services/api";
import Header from "../../components/Header";

import BalanceItem from "../../components/BalanceItem";
import { Area, Background, ListBalance, Title, List } from "./styles";
import HistoricList from "../../components/HistoricList";

export default function Home() {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const [movements, setMovements] = useState([]);

  useEffect(() => {
    let isActive = true;

    async function getMovements() {
      let dataFormatted = format(dateMovements, "dd/MM/yyyy");

      const receives = await api.get("/receives", {
        params: {
          date: dataFormatted,
        },
      });

      const balance = await api.get("/balance", {
        params: {
          date: dataFormatted,
        },
      });

      if (isActive) {
        setMovements(receives.data);
        setListBalance(balance.data);
      }
    }

    getMovements();

    return () => (isActive = false);
  }, [isFocused]);

  return (
    <Background>
      <Header title="Minhas movimentações" />

      <ListBalance
        data={listBalance}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.tag}
        renderItem={({ item }) => <BalanceItem data={item} />}
      />

      <Area>
        <TouchableOpacity>
          <Icon name="event" color="#121212" size={30} />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>

      <List
        data={movements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <HistoricList data={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 20}}
      />
    </Background>
  );
}
