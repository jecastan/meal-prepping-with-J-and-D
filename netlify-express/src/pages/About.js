import './About.css';

function About() {
    document.title = "About the Chefs"

    return (
        <main id="about">
            <h1>About the Chefs</h1>
            <p>Jesse and Daly are world class Keto chefs sharing their recipes with the world!</p>
            <img src="../imgs/The_Chefs.jpg" height='500px' alt={'The Chefs'}></img>
        </main>
    )
}

export default About;