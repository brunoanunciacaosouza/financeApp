import { useEffect, useState } from "react";
import { TouchableOpacity, Modal } from "react-native";
import { useIsFocused } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { format } from "date-fns";

import api from "../../services/api";
import Header from "../../components/Header";

import BalanceItem from "../../components/BalanceItem";
import { Area, Background, ListBalance, Title, List } from "./styles";
import HistoricList from "../../components/HistoricList";
import CalendarModal from "../../components/CalendarModal";

export default function Home() {
  const isFocused = useIsFocused();
  const [listBalance, setListBalance] = useState([]);
  const [dateMovements, setDateMovements] = useState(new Date());
  const [movements, setMovements] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

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
  }, [isFocused, dateMovements]);

  async function handleDelete(id) {
    try {
      await api.delete("/receives/delete", {
        params: {
          item_id: id,
        },
      });

      setDateMovements(new Date());
    } catch (error) {
      console.log(err);
    }
  }

  function filterDateMovements(dateSelected) {
    setDateMovements(dateSelected);
  }

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="event" color="#121212" size={30} />
        </TouchableOpacity>
        <Title>Ultimas movimentações</Title>
      </Area>

      <List
        data={movements}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HistoricList data={item} deleteItem={handleDelete} />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal visible={modalVisible} animationType="fade" transparent={true}>
        <CalendarModal
          setVisible={() => setModalVisible(false)}
          handleFilter={filterDateMovements}
        />
      </Modal>
    </Background>
  );
}
