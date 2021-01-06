import SightingCard from "./SightingCard";
const SightingsGrid = ({sightings, removeSighting}) => {
    const sightingsList = sightings.map((sighting) =>{
        return <SightingCard sighting={sighting} removeSighting={removeSighting} />
    });
    
    return (
        <>
            {sightingsList}
        </>
    );

}

export default SightingsGrid;