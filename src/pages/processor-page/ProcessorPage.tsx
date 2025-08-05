import "./ProcessorPage.scss"
export default function ProcessorPage(){
    return (
        <main className="page processor-page">
            <iframe
                src={"https://localhost:5002/hangfire"}
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