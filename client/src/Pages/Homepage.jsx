import React from "react";
import Layout from "../components/Layout";
import { Row, Col, Card, Carousel, Button } from "antd";
import { Link } from "react-router-dom";
import templeImage1 from "../img/t1.jpg";
import templeImage2 from "../img/t2.jpg";
import templeImage3 from "../img/t3.jpg";
import templeImage4 from "../img/t4.jpg";
import templeImage5 from "../img/t5.jpg";
import templeImage6 from "../img/t6.jpg";
import templeImage7 from "../img/Murudeshwar-Temple.jpg";
import "./Homepage.css";

const Homepage = () => {
  return (
    <Layout>
      <div className="homepage-content">
        <Carousel autoplay effect="fade">
          <div className="carousel-slide">
            <img src={templeImage1} alt="Temple 1" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={templeImage2} alt="Temple 2" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={templeImage3} alt="Temple 3" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={templeImage4} alt="Temple 4" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={templeImage5} alt="Temple 5" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={templeImage6} alt="Temple 6" className="carousel-image" />
          </div>
          <div className="carousel-slide">
            <img src={templeImage7} alt="Temple 7" className="carousel-image" />
          </div>
        </Carousel>
        <h1 className="text-center mb-3" style={{ marginTop: '20px' }}>Welcome to the Temple Management System</h1>
        <p className="intro-text">
          Our temple is a place of worship and community gathering. We offer various services and events to help you connect with your faith and community.
        </p>
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <Card className="feature-card" title="About the Temple" bordered={false} hoverable>
              <p>
                Learn more about our temple's history, mission, and the services we offer to our community.
              </p>
              <Button type="primary"><Link to="/about">Learn More</Link></Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="feature-card" title="Upcoming Poojas" bordered={false} hoverable>
              <p>
                Join us for our upcoming poojas and ceremonies. Check the schedule and book your participation in advance.
              </p>
              <Button type="primary"><Link to="/poojas">View Schedule</Link></Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="feature-card" title="Donations" bordered={false} hoverable>
              <p>
                Generous donations help us maintain the temple and support our community. Donate online or in person.
              </p>
              <Button type="primary"><Link to="/donation">Donate Now</Link></Button>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={8}>
            <Card className="feature-card" title="Map" bordered={false} hoverable>
              <p>
                Find us on the map and get directions to the temple. We are located in a serene and accessible location.
              </p>
              <Button type="primary"><Link to="/map">Get Directions</Link></Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="feature-card" title="Profile" bordered={false} hoverable>
              <p>
                Manage your profile and keep your information up to date. Access your booking history and preferences.
              </p>
              <Button type="primary"><Link to="/profile">Manage Profile</Link></Button>
            </Card>
          </Col>
          <Col span={8}>
            <Card className="feature-card" title="Contact Us" bordered={false} hoverable>
              <p>
                Have questions or need assistance? Contact us through our support channels. We are here to help you.
              </p>
              <Button type="primary"><Link to="/contact">Contact Us</Link></Button>
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ marginTop: '20px' }}>
          <Col span={24}>
            <Card className="feature-card" title="Gallery" bordered={false} hoverable>
              <p>
                Explore our gallery to see beautiful images of our temple and events.
              </p>
              <Button type="primary"><Link to="/gallery">View Gallery</Link></Button>
            </Card>
          </Col>
        </Row>
      </div>
    </Layout>
  );
};

export default Homepage;