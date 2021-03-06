import React, {
  FC,
  useEffect,
  useState,
} from 'react';
import {
  Table,
  Space,
  Button,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

import { getUserList } from 'apis/user/user';
import { User } from 'types/user/User';

const UserList: FC = () => {
  const [userList, setUserList] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: '80px',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      render: (text, data: User, rowKey) => (
        <Space>
          <Link to={`/user/detail/${data?.id}`}>
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const response = await getUserList();
      setUserList(response.data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <>
      <Table
        loading={isLoading}
        columns={columns}
        dataSource={userList}
        pagination={{ hideOnSinglePage: true }}
      />
    </>
  );
};

export default UserList;
