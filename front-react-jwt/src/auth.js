import axios from 'axios';
import React, { useState } from 'react';
import { tsTypeQuery } from '@babel/types';
export const isAuthenticated = () => {
    
    let token = localStorage.getItem('TOKEN')
        var config = {
            headers: {'authorization': `Bearer ${token}`}
          };
          const url="http://localhost:3002/auth/verifytoken";

          return  axios.get(url, config,{
            })
            .then(function (response){
             
            console.log("Data: "+response.status);
             return true;   
            })
            .catch(function (error){
                return false;
            console.log(error);
            })
            
            
        };

