import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { Layout, Typography, Button, Col, Row, Table, message} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { Comic } from "../interfaces/comic";
import { Basket } from "../interfaces/basket";
import { Member } from "../interfaces/member"


import { ListComics } from "../services/https";

const { Title } = Typography;


const Products = () => {
  // const navigate = useNavigate();

  const [BasketList, setBasketList] = useState<Comic[]>(() => {
    const savedBasket = localStorage.getItem("baskets")
    if (savedBasket) {
      return JSON.parse(savedBasket);
    }
    else {
      return [];
    }
  });
  const [comicList, setComicList] = useState<Comic[]>([]);

  // const [messageApi] = message.useMessage();

  const Member1: Member = {
    ID: 1,
    Email: "nongfun@gmail.com",
    Username : "NongFun",
    Password : "nongfun08"
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
      <button type="button" onClick={() => AddtoBasket(Member1, record)}>
        Add
      </button>
    }
  ]

  function AddtoBasket(m: Member, c: Comic){
    setBasketList([
      ...BasketList,
      {
        ID: c.ID,
        CategoryID: c.CategoryID,
        AdminID: c.AdminID,
        Image: c.Image,
        Title: c.Title,
        Description: c.Description,
        Url: c.Url,
        Price: c.Price
      }
    ])
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
                        ร้านค้าหนังสือการ์ตูน
                      </Title>
                    </Col>
                  </p>
                </Col>
            </Row>
          <Row>
            <Col span={24}>
              <Table 
                columns={Columns} 
                dataSource={comicList}
                pagination={false}
                scroll={{ x: 1500, y: 750}}
              />
            </Col>
          </Row>
        </Layout>
    </>
  );
};

export default Products;
