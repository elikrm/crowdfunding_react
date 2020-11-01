import React from "react";
import PledgeForm from "../components/Nav/PledgeForm/PledgeForm";

function PledgePage({ projectId}) {
    return (
        <PledgeForm projectId={projectId}/>
    );
}
export default PledgePage;