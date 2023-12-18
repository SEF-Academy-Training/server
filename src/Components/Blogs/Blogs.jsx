import React, { useEffect } from 'react';
import './Blogs.css';
import MainTitle from './MainTitle';
import BlogCard from './BlogCard';
import BlogsFeatured from '../../assest/images/Blogs Featured Image.png';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CTA from '../Global/CTA/CTA';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBlogs, getOneBlog } from '../../Redux/Reducers/BlgSlice';

const Blogs = () => {
	const dispatch = useDispatch();
	const { blogs, blog, loading, pagination } = useSelector((state) => state.BlogSlice);
	console.log('blogs', blogs, pagination);
	console.log('blog', blog);

	useEffect(() => {
		dispatch(getAllBlogs({ filter: {}, page: 1, limit: 10 }));
		dispatch(getOneBlog('657cad438b056f2cdbc143e1'));
	}, []);

	return (
		<>
			<MainTitle />
			<Container className="p-4 rounded-5 ">
				<Card
					className="d-flex align-items-center rounded-5"
					style={{ border: '1px solid rgb(55, 182, 255)' }}
				>
					<Row className="justify-content-center align-items-center container">
						<Col md={4}>
							<div className="box-image">
								<Card.Img
									variant="top"
									src={BlogsFeatured}
									alt="Blogs Featured"
								/>
							</div>
						</Col>
						<Col md={8}>
							<Card.Body className="box-text ">
								<Card.Title>Lorem ipsum dolor sit amet</Card.Title>
								<Card.Text>
									Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
									eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
									enim ad minim veniam, quis nostrud
								</Card.Text>
								<Link className="text-dark">Read More</Link>
							</Card.Body>
						</Col>
					</Row>
				</Card>
			</Container>
			<div className="container p-4">
				<Row className="m-md-auto">
					<BlogCard />
					<BlogCard />
					<BlogCard />

					<BlogCard />
					<BlogCard />
					<BlogCard />

					<BlogCard />
					<BlogCard />
					<BlogCard />
				</Row>
			</div>
			<CTA />
		</>
	);
};

export default Blogs;
