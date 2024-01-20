import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ReactPaginate from 'react-paginate';
import { BASE_URL } from './constant';

const NewsData = () => {

    const [data, setData] = useState([])
    const [search, setSearch] = useState('')
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10;

    const last = (currentPage + 1) * itemsPerPage;
    const first = last - itemsPerPage;

    const currentItems = data.filter((val) => val.author?.toLowerCase().includes(search.toLowerCase())).slice(first, last);

    useEffect(() => {
        axios.get(BASE_URL).then((res) => {
            setData(res.data.articles)
        })
    }, [])

    const handlePageClick = (data) => {
        setCurrentPage(data.selected);
    };

    return (
        <div className='container main'>
            <div className="table-responsive">
                <table className='table table-bordered'>
                    <thead>
                        <tr>
                            <td colSpan="5">
                                <input className='w-100 form-control' type="text" value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search Your Data" />
                            </td>
                            <td></td>
                            <td></td>
                            <td>
                                <div className="dropdown">
                                    <button className="btn btn-success dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        Author
                                    </button>
                                    <ul className="dropdown-menu">
                                        {
                                            currentItems.map((val, index) => {
                                                return (
                                                    <li key={index}>
                                                        <a className="dropdown-item" href="#">{val.author}</a>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Id</th>
                            <th>Source</th>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>PublishedAt</th>
                            <th>Image</th>
                            <th>Content</th>
                        </tr>
                        {
                            currentItems.map((val, index) => {
                                const publishedDate = new Date(val.publishedAt).toLocaleDateString();
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{val.source.name}</td>
                                        <td>{val.author}</td>
                                        <td>{val.title}</td>
                                        <td>{val.description}</td>
                                        <td>{publishedDate}</td>
                                        <td>
                                            <img style={{ width: "200px", height: "200px" }} src={val.urlToImage} alt="api img" />
                                        </td>
                                        <td>{val.content}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={10}
                    marginPagesDisplayed={10}
                    pageRangeDisplayed={5}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    )
}

export default NewsData