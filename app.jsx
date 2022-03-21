/*
Name: Lam Wai To Keith
Student ID: 1155133260
*/
const { useEffect, useState } = React;

const data = [
    {filename: "cuhk-2013.jpg", year: 2013, remarks: "Sunset over CUHK"},
    {filename: "cuhk-2017.jpg", year: 2017, remarks: "Bird's-eye view of CUHK"},
    {filename: "sci-2013.jpg", year: 2013, remarks: "The CUHK Emblem"},
    {filename: "shb-2013.jpg", year: 2013, remarks: "The Engineering Buildings"},
    {filename: "stream-2009.jpg", year: 2009, remarks: "Nature hidden in the campus"},
    ];

const {BrowserRouter, Routes, Route, Link} = ReactRouterDOM;
const {useMatch, useParams, useLocation} = ReactRouterDOM;

function LongLink({label, to}) {
    let match = useMatch({path: to});
    return (
        <li className={match ? "active" : ""}>
            <Link to={to}>{label}</Link>
        </li>
    );
}

function Title(props) {
    return (
        <header className="bg-warning">
            <h1 className="display-4 text-center">{props.name}</h1>
        </header>
    );
}

function Home() {
    return(
        <div>
            <h2>Home</h2>
            <img src="tree.png" className="mx-auto d-block " />
        </div> 
    );
}

function Gallery() { 
    return (
        <main>
            {data.map((file, index) => <FileCard i={index} key={index} />)}
        </main>
    )
}

function FileCard(props) {
    const [selected, setSelected] = React.useState(-1);

    function handleMouseOver(index, e) {
        selected == -1? setSelected(index):setSelected(-1);
    }

    return (
        <div className="card d-inline-block m-2" style={{width:selected == props.i ?220:200}} onMouseOver={(e) => handleMouseOver(props.i, e)} onMouseOut={(e) => handleMouseOver(props.i, e)}>
            <img src={"images/"+data[props.i].filename} className="w-100" />
            <div className="card-body">
                <h6 className="card-title">{data[props.i].filename}</h6>
                <p className="card-text">{data[props.i].year}</p>
                <p className="card-text" style={{display:selected == props.i ?"inline-block":"none"}}>{data[props.i].remarks}</p>
            </div>
        </div>
    )
}


function SlideShow() {

    const [currentImageID, setCurrentImageID] = React.useState(0);
    const [currentInterval, setCurrentInterval] = React.useState(1500);
    const [slideShowOn, setSlideShowOn] = React.useState(false);

    useEffect(() => {
        if(slideShowOn){
        const interval = setInterval(() => {
            setCurrentImageID(id => (id + 1) % 5)
        }, currentInterval);
        return () => clearInterval(interval);
        }
      }, [slideShowOn, currentInterval]);

    return(
        <div>
            <div className="container d-flex justify-content-center" style={{marginBottom:20}}>
                <button className="button-light" style={{margin:3}} onClick={() => setSlideShowOn(true)}>Start Slideshow</button>
                <button className="button-light" style={{margin:3}} onClick={() => setSlideShowOn(false)}>Stop Slideshow</button>
                <button className="button-light" style={{margin:3}} onClick={() => setCurrentInterval(interval => interval>250? interval - 250:250)}>Faster</button>
                <button className="button-light" style={{margin:3}} onClick={() => setCurrentInterval(interval => interval + 250)}>Slower</button>
            </div>

            <div className="d-flex justify-content-center">
                    <img src={"images/"+data[currentImageID].filename} className="w-50" />
            </div>
        </div>
    );
}

function NoMatch() {
    let location = useLocation();
    return (
        <div>
            <h3>
                No match for <code>{location.pathname}</code>
            </h3>
        </div>
    )
}

function App(props) {
    return (
        <React.StrictMode>
            <BrowserRouter>
                <Title name={props.name} />
                <div>
                    <ul>
                        <LongLink to="/" label="Home">Home</LongLink>
                        <LongLink to="/gallery" label="Gallery">Gallery</LongLink>
                        <LongLink to="/slideshow" label="Slideshow">SlideShow</LongLink>
                    </ul>
                    <hr/>

                    <Routes>
                        <Route path="/" element={<Home name={props.name} />} />
                        <Route path="/gallery" element={<Gallery />} />
                        <Route path="/slideshow" element={<SlideShow />} />
                        <Route path="*" element={<NoMatch />} />
                    </Routes>
                </div>
            </BrowserRouter>     
        </React.StrictMode>
    );
}

ReactDOM.render(
    <App name="CUHK pictures"/>,
    document.querySelector('#app')
)