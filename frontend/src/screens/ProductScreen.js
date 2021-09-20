import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap';
import Rating from '../components/Rating';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { listProductDetails } from '../actions/productActions';

const ProductScreen = ({history, match}) => {

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch()

    const productDetails = useSelector(state => state.productDetails);
    const {loading, error, product} = productDetails;

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
     }, [dispatch, match])


     const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty}`)
     }

    return (
        <>
            <Link className="btn btn-light my-3" to="/">
                商品一覧へ
            </Link>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : 
            <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>
                            {product.name}
                        </h3>
                    </ListGroup.Item>
                </ListGroup>
                <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews}レビュー`} />
                </ListGroup.Item>
                <ListGroup.Item>
                    金額: {product.price}円
                </ListGroup.Item>
                <ListGroup.Item>
                    商品について: {product.description}
                </ListGroup.Item>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>           
                            <Row>
                                <Col>
                                    金額: 
                                </Col>
                                <Col>
                                    <strong>{product.price}円</strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>           
                            <Row>
                                <Col>
                                    商品情報: 
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? "在庫あり" : "売り切れ"}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        {product.countInStock > 0 && (
                            <ListGroup.Item>
                                <Row>
                                    <Col>個数</Col>
                                    <Col>
                                        <Form.Control as='select' value={qty} 
                                            onChange={(e) => setQty(e.target.value)}
                                        >
                                            {[...Array(product.countInStock).keys()].map(i => (
                                                <option key={i + 1} value={i + 1}>{i + 1 }</option>
                                            ))}
                                        </Form.Control>
                                    </Col>
                                </Row>
                            </ListGroup.Item>
                        )}

                        <ListGroup.Item>           
                            <Button onClick={addToCartHandler} className="btn btn-black" type="button" disabled={product.countInStock === 0}>
                                カートに追加する
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>
            </Col>
        </Row>
            }    
        </>
    )
}

export default ProductScreen
