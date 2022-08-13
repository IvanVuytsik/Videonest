import './App.css';
import React, { useState } from 'react';
import { darkTheme, lightTheme } from "./utils/Theme";
import styled, { ThemeProvider } from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/SignIn";
import Search from "./pages/Search";

import express from "express";
import cors from "cors";
const app = express();
app.use(express.json())
app.use(cors())

const Container = styled.div`
  display: flex;
  background-color: ${({theme}) => theme.bgLighter};
`;

const Main = styled.div`
  flex: 7;
`;

const Wrapper = styled.div`
`;


function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <Container className="App">
        <BrowserRouter>
          
            <Menu darkMode={darkMode} setDarkMode={setDarkMode} />

            <Main>
              <Navbar />

              <Wrapper>
                <Routes>
                  <Route path="/">
                    <Route index element={<Home type="random"/>} /> 
                    <Route path="trends" element={<Home type="trend"/>} /> 
                    <Route path="subscriptions" element={<Home type="sub"/>} /> 

                    <Route path="search" element={<Search />} /> 

                    <Route path="signin" element={<SignIn />} /> 

                    <Route path="video">
                      <Route path=":id" element={<Video />} /> 
                    </Route>

                  </Route>
                </Routes>
              </Wrapper>

            </Main>

        </BrowserRouter>
      </Container>
    </ThemeProvider>
  );
}

export default App;
