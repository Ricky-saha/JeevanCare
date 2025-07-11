import Banner from "../../components/all/Banner";
import Header from "../../components/all/Header";
import SpecialityMenu from "../../components/all/SpecialityMenu";
import TopDoctors from "../../components/all/TopDoctors";

export default function Home(){
    return(
        <>
        <Header/>
        <SpecialityMenu/>
        <TopDoctors/>
        <Banner/>
        
        </>
    )
}