import React, { Component, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


function Test(){
    const search = useLocation().search;
    const query2 = new URLSearchParams(search);
    
    return  (
        <div>
            <p>{query2.get('id')}</p>
        </div>
    );
}
export default Test;