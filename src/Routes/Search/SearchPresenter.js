import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import Section from "../../Components/Section";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Helmet from "react-helmet";

const Container = styled.div`
  padding: 20px;
`;

const Form = styled.form`
  margin-bottom: 50px;
  width: 100%;
`;

const Input = styled.input`
  all: unset;
  font-size: 28px;
  width: 100%;
`;

const SearchPresenter = ({
  movieResults,
  searchTerm,
  tvResults,
  error,
  Loading,
  handelSumbit,
  update
}) => (
  <>
    <Helmet>
      <title>Search | nomflix</title>
    </Helmet>
    {
      <Container>
        <Form onSubmit={handelSumbit}>
          <Input
            placeholder="Search Movies or Tv shows ..."
            value={searchTerm}
            onChange={update}
          />
        </Form>
        {Loading ? (
          <Loader />
        ) : (
          <>
            {movieResults && movieResults.length > 0 && (
              <Section title="Movie Results">
                {movieResults.map((movie) => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
            {tvResults && tvResults.length > 0 && (
              <Section title="TV Results">
                {tvResults.map((show) => (
                  <Poster
                    key={show.id}
                    id={show.id}
                    imageUrl={show.poster_path}
                    title={show.name}
                    rating={show.vote_average}
                    year={show.first_air_date}
                  />
                ))}
              </Section>
            )}
          </>
        )}
        {error ? <Message text={error} color="white" /> : null}
        {movieResults &&
          tvResults &&
          movieResults.length === 0 &&
          tvResults.length === 0 && (
            <Message text={"Cant find anything"} color="#95a5a6" />
          )}
      </Container>
    }
  </>
);
SearchPresenter.propTypes = {
  movieResults: PropTypes.array,
  popular: PropTypes.array,
  searchTerm: PropTypes.string,
  error: PropTypes.string,
  Loading: PropTypes.bool.isRequired,
  handelSumbit: PropTypes.func.isRequired,
  update: PropTypes.func
};

export default SearchPresenter;
