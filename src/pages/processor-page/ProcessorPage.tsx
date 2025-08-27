import "./ProcessorPage.scss"
export default function ProcessorPage(){
    return (
        <main className="page processor-page">
            <iframe
                src={`${process.env.REACT_APP_GENERATOR_URL}/hangfire`}
                style={{
                    width: '100vw',
                    height: '100vh',
                    border: 'none',
                    position: 'sticky'
                }}
                title="Dashboard"
            />
        </main>
    )   
}