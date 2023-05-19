import React ,{useRef, useState} from 'react';
import {useNavigate} from 'react-router-dom';
//import img from '../assets/arogya-jabalpur-high-resolution-logo-color-on-transparent-background.png';
import {Get} from '../dbFatch';
import img1 from '../assets/dweb_instant_video_consulation.png';
import img2 from '../assets/dweb_surgeries.png';
import img3 from '../assets/images.jpeg';
import img4 from '../assets/why-choose-livlong-consult.jpg';
import img5 from '../assets/Screenshot 2023-04-13 164150.jpg';
import img6 from '../assets/teleconsultation-web.jpg';
import dev1img from '../assets/vgg tg cvgh.jpg';
import dev2img from '../assets/WhatsApp Image 2023-04-23 at 12.56.50 AM.jpeg';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button } from 'react-bootstrap';
import { useApplicationContext } from '../context';
// import Card from '../components/Cards';
import ProductCards from '../components/ProductCards';
import { useEffect } from 'react';
import { Suspense } from 'react';
import { ProductCantainer } from '../components/ProductCantainer';
const Home = () => {
 const  navigator = useNavigate();
 const searchRef = useRef(''); 
 const {openFilter} = useApplicationContext();

 return (
    <div style={{ width: "100%", height: "100%", alignItems: "center", paddingTop: "2rem" }}>
      <section className='carousel' style={{ marginTop: "5rem" }}>
        <Carousel showArrows={false}
          showIndicators={false}
          showThumbs={false}
          autoPlay={true}
          interval={4000}
          showStatus={false}
          infiniteLoop={true}
        >
          {/* <div style={{ display: "flex", justifyContent: "center", backgroundColor: "white", flexWrap: "wrap", flexDirection: "row" }} className='demo' >
            <div>
              <img src={img1} alt='image' height={'350px'} width={'300px'} style={{ objectFit: "cover" }} />
            </div>
            <aside>
              <h2>
                Instant video consultation
              </h2>
              <h3>
                connect within 60 sec
              </h3>
              <Button variant="outline-success" onClick={() => { navigator('/doctors') }} >Consult Now</Button>
            </aside>
          </div> */}
          <div style={{ display: "flex", justifyContent: "center", backgroundColor: "white", flexWrap: "wrap", flexDirection: "row" }}>
            <div>
              <img src={img2} alt='image' height={'350px'} width={'300px'} style={{ objectFit: "cover" }} />
            </div>
            <aside >
              <h2>
                Find Doctors Near You
              </h2>
              <h3>
                confirmed appointments
              </h3>
              <Button variant="outline-success" onClick={() => { navigator('/doctors') }} >Book Appointments</Button>
            </aside>
          </div>
          <div style={{ display: "flex", justifyContent: "center", backgroundColor: "white", flexWrap: "wrap", flexDirection: "row" }}>
            <div>
              <img src={img3} alt='image' height={'350px'} width={'300px'} style={{ objectFit: "cover" }} />
            </div>
            <aside >
              <h2>
                BloodCell
              </h2>
              <h3>
                blood from your nearest Bloodbank
              </h3>
              <Button variant="outline-success" onClick={() => { navigator('/') }} >Find BloodBank</Button>
            </aside>
          </div>
          <div style={{ display: "flex", justifyContent: "center", backgroundColor: "white", flexWrap: "wrap" }}>
            <div>
              <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDqCwpLSd7HOkN7uH7DmopDGqIL4xDkNuHOg&usqp=CAU' alt='image' height={'350px'} width={'300px'} style={{ objectFit: "cover" }} />
            </div>
            <aside>
              <h2>
                Medicines
              </h2>
              <h3>
                Essentials at you doorstep
              </h3>
              <Button variant="outline-success" onClick={() => { navigator('/') }} >Order Now</Button>
            </aside>
          </div>

        </Carousel>

      </section>
      <hr />
      <section style={{display:"flex",justifyContent:"center",padding:"3rem",flexDirection:"column"}}>
         <h2> Buy Medicines</h2> <br/>
          <div style={{display:"flex",flexDirection:"row",justifyContent:"center",width:"100%"}} >
           <input type='text' ref={searchRef} value={searchRef.current.values} style={{width:"70%" ,borderRadius: "50px 0px 0px 50px" }} placeholder='search' />
           <button style={{borderRadius: "0px 50px 50px 0px"}}>Search</button>
           <div style={{ paddingLeft: "1.5rem", paddingRight: ".5rem" }}>
            <Button
              onClick={openFilter}
              style={{ width: "3rem", height: "3rem", position: "relative" }}
              variant="outline-primary"
              className="rounded-circle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" id="Filter">
                <path d="M2 7h.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2H9.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2zm4-3a2 2 0 1 1-2 2 2 2 0 0 1 2-2zm24 11h-.142a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h20.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-4 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2zm4 7H19.858a3.981 3.981 0 0 0-7.716 0H2a1 1 0 0 0 0 2h10.142a3.981 3.981 0 0 0 7.716 0H30a1 1 0 0 0 0-2zm-14 3a2 2 0 1 1 2-2 2 2 0 0 1-2 2z" fill="currentColor" class="color000000 svgShape">
                </path></svg>
            </Button>
           
          </div>
          
          </div>
           
          <div style={{display:"flex",margin:"auto",width:"90%",flexDirection:"row",gap:"1rem",flexWrap:"wrap"}}> 
           <ProductCantainer />   
         </div>
      </section>
      <section style={{ display: "flex", justifyContent: "center", padding: '3rem', flexWrap: "wrap", backgroundColor: "lightskyblue" }}>
        <div >
          <img src={img4} alt='why choose as' height={400} width={350} />
        </div>
        <div style={{ paddingTop: "2rem" }}>
          <div style={{ fontWeight: '800', height: "", backgroundColor: "greenyellow", borderRadius: "0px 50px 50px 0px" }}>
            <h2>Why to Choose Online Doctor Consultation?</h2>
          </div>
          <div>
            <ul>
              <li> Book on appointments hassle-free</li>
              <li>Highly Qualified & Expert panel of Doctors</li>
              <li>45+ Specialities covered </li>
              <li>24/7 Customer support</li>
              <li>24/7 genral physician Teleconsultation available </li>
              <li>Delivery of Medicines at home</li>
            </ul>
          </div>
        </div>
      </section>
      <img src={img5} alt='key features' height={'30%'} width={'100%'} />
      <center><h2> Consultation Scheduling Process</h2></center>
      <img src={img6} alt='key features' height={'30%'} width={'100%'} />
      <div style={{ fontSize: "2rem", fontWeight: "800", textAlign: "center" }}>OUR DEVELPOERS</div>
      <div id='Develpor' style={{ display: "flex", gap: "2dvw", justifyContent: "center", flexDirection: "row", flexWrap: "wrap" }}>

        <div style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)", justifyContent: "center", alignItems: "center" }}>
          <div className='DevCard' style={{}}>
            <img src={dev2img} height={'150px'} width={'150px'} style={{ borderRadius: "50%" }} />
            <h3><strong>Mr.Utkarsh Rajak</strong></h3>
            <h5>MCA Student of JEC College</h5>
            <h5>worked as a full stack develoer</h5>
            <h4><strong>contect me on </strong></h4>
            <>contect no : 9407267994</>
            <><a href='mailto: rajakutkrsh123@gmail.com' >rajakutkrsh123@gmail.com</a></>
            <h4>Social media account</h4>
            <a href="https://twitter.com/sigma_utkarsh9" alt="https://twitter.com">Twitter</a>
            <a href="https://www.linkedin.com/in/utkarsh-rajak-987b03249" alt="https://www.linkedin.com">Linkdin</a>
            <a href="https://github.com/mohitdubey132" alt="https://github.com">Github</a>

          </div>
        </div>

        <div style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)", justifyContent: "center" }}>

          <div className='DevCard' >
            <img src={dev1img} height={'150px'} width={'150px'} style={{ borderRadius: "50%" }} />
            <h3><strong>Mr.Mohit Dubey</strong></h3>
            <h5>MCA Student of JEC College</h5>
            <h5>worked as a full stack develoer</h5>
            <h4><strong>contect me on </strong></h4>
            <>contect no : 626383993</>
            <><a href='mailto: mohitdubey1322001@gmail.com' >mohitdubey1322001@gmail.com</a></>
            <h4>Social media account</h4>
            <a href="https://twitter.com/MohitDu25017405" alt="https://twitter.com">Twitter</a>
            <a href="https://www.linkedin.com/in/mohit-dubey-0903b6226" alt="https://www.linkedin.com">Linkdin</a>
            <a href="https://github.com/mohitdubey132" alt="https://github.com">Github</a>

          </div>
        </div>
        {/* <DeveloerCard /> */}

      </div>

    </div>
  )
}


/**developer card */
const DeveloerCard = ({ devloper: { name, college, work, phoneNumer, email, twitter, github, linkdin } }) => {
  return (
    <div style={{ boxShadow: "0px 0px 5px rgba(0, 0, 0, 1)", padding: "2dvw", justifyContent: "center", alignItems: "center" }}>
      <div style={{ display: "flex", borderRadius: "50%", zIndex: 1, flexDirection: "column", justifyContent: "center" }}> <img src={dev1img} height={'150px'} width={'150px'} style={{ borderRadius: "50%" }} />
        <h3><strong>{name}</strong></h3>
        <h5>{college}</h5>
        <h5>{work} </h5>
        <h4><strong>contect me on </strong></h4>
        <>contect no :{phoneNumer} </>
        <><a href={email} >mohitdubey1322001@gmail.com</a></>
        <h4>Social media account</h4>
        <a href={twitter} alt="https://twitter.com">{(twitter) ? 'Twitter' : null}</a>
        <a href={linkdin} alt="https://www.linkedin.com">{(linkdin) ? 'Linkdin' : null}</a>
        <a href={github} alt="https://github.com">{(github) ? 'Github' : null}</a>

      </div>
    </div>

  )

}

export default Home