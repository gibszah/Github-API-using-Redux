import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HiUser } from "react-icons/hi";

import { fetchCommits, fetchRepos } from "./action";
import "bulma/css/bulma.css";

const FormRepo = () => {
	const [username, setUsername] = useState("");
	const [repo, setRepo] = useState(null);
	const dispatch = useDispatch();
	const repos = useSelector((state) => state.repos);
	const commits = useSelector((state) => state.commits);
	const loading = useSelector((state) => state.loading);
	const error = useSelector((state) => state.error);

	const handleSubmit = (e) => {
		e.preventDefault();
		dispatch(fetchRepos(username));
		setRepo(null);
	};

	const handleCommits = (repo) => {
		setRepo(repo);
		dispatch(fetchCommits(username, repo.name));
	};

	return (
		<>
			<div className='container pt-5  mt-3'>
				<div className='columns'>
					<div
						className='column is-half'
						style={{ background: "#8A8E8E" }}
					>
						<form onSubmit={handleSubmit}>
							<div className='field-body'>
								<div className='field'>
									<p className='control is-expanded has-icons-left'>
										<input
											className='input'
											type='text'
											placeholder='GitHub username'
											id='username'
											value={username}
											onChange={(e) => setUsername(e.target.value)}
										/>
										<span className='icon is-small is-left'>
											<HiUser />
										</span>
									</p>
								</div>
								<button
									class='button is-warning'
									type='submit'
								>
									Fetch Repos
								</button>
							</div>
						</form>
						<hr />
						{loading && <p>Loading...</p>}
						{error && <p>{error}</p>}
						{repos.length > 0 && (
							<ul>
								{repos.map((repo) => (
									<li
										key={repo.id}
										onClick={() => handleCommits(repo)}
									>
										<button className='button is-success is-light m-2'>
											{repo.name}
										</button>
									</li>
								))}
							</ul>
						)}
						<hr />
						{repo && (
							<div>
								<div style={{ color: "white", fontWeight: "bold" }}>
									<strong>Commits for </strong>
									{repo.name}{" "}
								</div>
								{commits.length > 0 ? (
									<ul>
										{commits.map((commit) => (
											<li key={commit.sha}>
												<div className='box m-2'>
													<article className='media'>
														<div className='media-content'>
															<div className='content'>
																<p>
																	<strong>{commit.commit.author.name}</strong>
																	&nbsp;
																	<small>@{username}</small> <br />{" "}
																	{commit.commit.message}
																</p>
															</div>
														</div>
													</article>
												</div>
											</li>
										))}
									</ul>
								) : (
									<p>No commits found.</p>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default FormRepo;
