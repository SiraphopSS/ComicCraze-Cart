import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Layout, Typography, Button, Col, Row, Table, Modal} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Basket } from "../interfaces/basket";
import { Comic } from "../interfaces/comic";
import { Member } from "../interfaces/member";
import { DeleteComicFromBasket, GetBasketByMember, GetComic, ListComics } from "../services/https";

const { Title, Text } = Typography;

function Cart() {

  const [comicList, setComicList] = useState<Comic[]>([]);
  const [BasketList, setBasketList] = useState<Comic[]>(() => {
    const savedBasket = localStorage.getItem("basket")
    if (savedBasket) {
      return JSON.parse(savedBasket);
    }
    else {
      return [];
    }
  })

  // จำลองผู่้ใช้งาน
  const Member1: Member = {
    ID: 1,
    Email: "Test@gmail.com",
    Username : "TestSubject",
    Password : "1234"
  }

const Columns: ColumnsType<Comic> = [

  {
    title: "",
    dataIndex: "Image",
    width: 100,
    render: (text, record, index) => (
      <img src={record.Image} className="w3-left w3-circle w3-margin-right" style={{ width: '100%' }} />
    )
  },
  {
    title: "Title",
    dataIndex: "Title",
    width: 450
  },
  {
    title: "Price (Baht)",
    dataIndex: "Price",
    width: 150
  },
  {
    title: "",
    key: "operation",
    fixed: 'right',
    width: 50,
    render: (text, record, index) => 
    <button type="button" onClick={() => RemoveFromBasket(record)}>
      Remove
    </button>
  }
]

const [basketData, setBasketData] = useState<Basket[]>([]);
const [comicID, setComicID] = useState<number>();
const [open, setOpen] = useState(false);
const [confirmLoading, setConfirmLoading] = useState(false);
// const [messageAPI] = message.useMessage();

const RemoveFromBasket = (cid: Comic) => {
  setComicID(cid.ID)
  setOpen(true);
}

const handleOk = async () => {
  setConfirmLoading(true);
  let res = await DeleteComicFromBasket(Member1, comicID);
  if (res) {
    console.log("Success")
    setOpen(false);
  }
  else {
    console.log("Failed")
    setOpen(false);
  }
  const remove = 
  setConfirmLoading(false);
};



// const getComicList = async () => {
//   let res = await ListComic()
//   if (res)
// }

const GetBasketbyMem = async () => {
  let res = await GetBasketByMember(Member1);
  if (res) {
    console.log(res)
    setBasketData(res);
  }
}

const getComicList = async () => {
  let res = await ListComics();
  if (res) {
    setComicList(res);
  }
}



const handleCancel = () => {
  setOpen(false);
}

useEffect(() => {
  GetBasketbyMem();
  getComicList();
  localStorage.setItem('basket', JSON.stringify(BasketList))
}, [BasketList]);

  return (
    <>
      <Header />
      <Navbar />
      <Layout>
            <Row>
                <Col span={6} offset={1}>
                  <p style={{ backgroundColor:"#FFA138", lineHeight: 1.25 , borderRadius: '15px'}}>
                    <Col offset={6}>
                      <Title level={2} style={{lineHeight: 1.75}} >
                        ตะกร้าหนังสือการ์ตูน
                      </Title>
                    </Col>
                  </p>
                </Col>
            </Row>
          <Row>
            <Col span={24}>
              <Table 
                rowKey="ID"
                columns={Columns} 
                dataSource={comicList}
                pagination={false}
                scroll={{ x: 1500, y: 750}}
                summary={ (data) => {
                  let total = 0
                  data.forEach(({ Price }) => {
                    total += Price;
                  });
                  return (
                    <>
                      <Table.Summary.Row>
                        <Table.Summary.Cell index={0}></Table.Summary.Cell>
                        <Table.Summary.Cell index={1}> Total </Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>
                          { <Text type="danger"> { total } </Text> }
                        </Table.Summary.Cell>
                      </Table.Summary.Row>
                    </>
                  );
                }}
              />
              <Modal
                title="ลบข้อมูล ?"
                open={open}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={handleCancel}
              ></Modal>
            </Col>
          </Row>
          <Row>
            <Col span={7} offset={11}>
            <Link to="/Payment">
              <Button type="primary" danger size="large">
                ยืนยันรายการ
              </Button>
            </Link>
            </Col>
          </Row>
      </Layout>
    </>
  );
};

export default Cart;
