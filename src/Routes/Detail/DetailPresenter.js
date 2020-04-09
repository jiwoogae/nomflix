import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Helmet from "react-helmet";
import Section from "../../Components/Section";
import Store from "../../Store";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 12px;
  opacity: 0.7;
  line-height: 1.5;
  width: 70%;
  margin-bottom: 30px;
`;

const Production = styled.div`
  background-image: url(${(props) => props.bgUrl});
  height: 150px;
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
`;

const ProductionName = styled.div`
  justify-content: center;
  font-size: 10px;
`;

const Select = styled.div`
  margin-bottom: 30px;
  display: grid;
  width: 36%;
  grid-template-columns: repeat(3, max-Content);
  justify-content: space-between;
`;

const Company = styled.button`
  height: 30px;
  padding: 5px;
  background-color: #636e72;
  border-radius: 10px;
`;

const Videos = styled.button`
  height: 30px;
  padding: 5px;
  background-color: #636e72;
  border-radius: 10px;
`;

const Genres = styled.button`
  height: 30px;
  padding: 5px;
  background-color: #636e72;
  border-radius: 10px;
`;

const noImageUrl =
  "http://directory.beauty-africa.com/assets/media/noimage.png";

const DetailPresenter = () => (
  <Store.Consumer>
    {(store) =>
      store.Loading ? (
        <>
          <Helmet>
            <title>loading | nomflix</title>
          </Helmet>
          <Loader />
        </>
      ) : (
        <>
          <Helmet>
            <title>
              {store.result.original_title
                ? `${store.result.original_title} | nomflix`
                : `${store.result.original_name} | nomflix`}
            </title>
          </Helmet>

          <Container>
            <Backdrop
              bgImage={`https://image.tmdb.org/t/p/original${store.result.backdrop_path}`}
            />
            <Content>
              <Cover
                bgImage={
                  store.result.poster_path
                    ? `https://image.tmdb.org/t/p/original${store.result.poster_path}`
                    : noImageUrl
                }
              />
              <Data>
                <Title>
                  {store.result.original_title
                    ? store.result.original_title
                    : store.result.original_name}
                </Title>
                <ItemContainer>
                  <Item>
                    {store.result.release_date
                      ? store.result.release_date.substring(0, 4)
                      : store.result.first_air_date.substring(0, 4)}
                  </Item>
                  <Divider>•</Divider>
                  <Item>
                    {store.result.runtime
                      ? store.result.runtime
                        ? store.result.runtime
                        : store.result.episode_run_time[0]
                      : null}
                    min
                  </Item>
                  <Divider>•</Divider>
                  <Item>
                    {store.result.genres &&
                      store.result.genres.map((genre, index) =>
                        index === store.result.genres.length - 1
                          ? genre.name
                          : `${genre.name} / `
                      )}
                  </Item>
                </ItemContainer>
                <Overview>{store.result.overview}</Overview>
                <Select>
                  <Company
                    value="Companies"
                    onClick={(e) => store.changeValue(e.target.value)}>
                    Production Companies
                  </Company>
                  <Videos
                    value="Trailers"
                    onClick={(e) => store.changeValue(e.target.value)}>
                    Trailers
                  </Videos>
                  <Genres
                    value="Genres"
                    onClick={(e) => store.changeValue(e.target.value)}>
                    Genres
                  </Genres>
                  {console.log(store.value)}
                </Select>
                {store.value === "Companies" &&
                store.result.production_companies.length > 0 ? (
                  <Section title="Production Companyies">
                    {store.result.production_companies.map((names) => (
                      <div key={names.id}>
                        <ProductionName>
                          {names.name.length > 15
                            ? `${names.name.substring(0, 15)}...`
                            : names.name}
                        </ProductionName>
                        <Production
                          bgUrl={
                            names.logo_path
                              ? `https://image.tmdb.org/t/p/original${names.logo_path}`
                              : noImageUrl
                          }></Production>
                      </div>
                    ))}
                  </Section>
                ) : null}
                {store.value === "Genres" && store.result.genres.length > 0 ? (
                  <Section title="Genres">
                    {store.result.genres.map((key) => (
                      <ProductionName>{key.name}</ProductionName>
                    ))}
                  </Section>
                ) : null}
              </Data>
            </Content>
          </Container>
        </>
      )
    }
  </Store.Consumer>
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  Loading: PropTypes.bool
};

export default DetailPresenter;
