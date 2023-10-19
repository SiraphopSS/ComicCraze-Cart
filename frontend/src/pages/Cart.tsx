import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { Layout, Typography, Button, Col, Row, Table, Modal} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Basket } from "../interfaces/basket";
import { Comic } from "../interfaces/comic";
import { Member } from "../interfaces/member";
import {  GetComic, ListComics } from "../services/https";

const { Title, Text } = Typography;

function Cart() {

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
    render: (record) => (
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
    render: (record) => 
    <button type="button" onClick={() => RemoveFromBasket(record.ID)}>
      Remove
    </button>
  }
]

const [Total, setTotal]= useState(0);
const [comicList, setComicList] = useState<Comic[]>([]);
const [BasketList, setBasketList] = useState<Comic[]>(() => {
  const savedBasket = localStorage.getItem("baskets")
    if (savedBasket) {
      return JSON.parse(savedBasket);
    }
    else {
      return [];
    }
})

// const [comicID, setComicID] = useState<number>(0);
// const [messageAPI] = message.useMessage();

const RemoveFromBasket = (cid: number) => {
  removeComic(cid);
  
}

const removeComic = (id: number) => {
  const newList = BasketList.filter((item) => {
    return item.ID !== id
  })
  setBasketList(newList);
}

const getComicList = async () => {
  let res = await ListComics();
  if (res) {
    setComicList(res);
  }
}


useEffect(() => {
  getComicList();
  localStorage.setItem('baskets', JSON.stringify(BasketList))
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
