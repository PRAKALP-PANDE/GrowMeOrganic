import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentComponent from './DepartmentComponent';
import departmentData from './data.json';


interface Post {
    userId: number;
    id: number;
    title: string;
    body: string;
}


const SecondPage = () => {
    const nacigate = useNavigate();
    const userDetails = JSON.parse(localStorage.getItem('userDetails') || '{}');

    if (!userDetails.name || !userDetails.phoneNumber || !userDetails.email) {
        // Redirect back to the form page with a message
        nacigate('/form-page');
        return <div>Please enter your details before accessing this page.</div>;
    }

    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setPosts(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchData();
    }, []);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'title', headerName: 'Title', width: 300 },
        { field: 'body', headerName: 'Body', width: 600 },
    ];

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={posts} columns={columns} />
            {/* <DataGrid rows={posts} columns={columns} pageSize={5} /> */}
            <DepartmentComponent data={departmentData} />
        </div>
    );
};

export default SecondPage;
