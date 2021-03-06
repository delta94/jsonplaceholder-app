import React, {
  FC,
  useState,
  useEffect,
} from 'react';
import {
  Button,
  Space,
  Table,
} from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined } from '@ant-design/icons';

import { getAlbumList } from 'apis/album/album';
import { getUserList } from 'apis/user/user';
import { Album } from 'types/album/Album';
import { User } from 'types/user/User';

const AlbumList: FC = () => {
  const [albumList, setAlbumList] = useState<Album[]>([]);
  const [userList, setUserList] = useState<User[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const getAlbums = async () => {
      try {
        const response = await getAlbumList();
        setAlbumList(response.data);
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    };
    getAlbums();
  }, []);
  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await getUserList();
        setUserList(response.data);
      } catch (e) {
        console.log(e);
      }
    };
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
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
    },
    {
      title: 'User',
      dataIndex: 'userId',
      key: 'userId',
      render: (text, data: Album, rowKey) => (
        <Link to={`/user/detail/${data.userId}`}>
          {getUserName(data.userId)}
        </Link>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '100px',
      render: (text, data: Album, rowKey) => (
        <Space>
          <Link to={`/album/detail/${data.id}`}>
            <Button>
              <EyeOutlined />
            </Button>
          </Link>
        </Space>
      ),
    },
  ];

  const getUserName = (userId: number|null): string => {
    const user = userList.find((data) => data.id === userId);
    if (user) {
      return user.name;
    }
    return '';
  };

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={albumList}
    />
  );
};

export default AlbumList;
