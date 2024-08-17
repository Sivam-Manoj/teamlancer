import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [navigate, isLoggedIn]);

  const handlePage = () => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  };

  return (
    <div>
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
              Let's Team up with
              <span className="sm:block"> Developers Like You. </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl md:text-lg sm:text-xl/relaxed">
              Sri Lanka's top platform for developers, TeamLancer, is here to
              revolutionize the way you collaborate on projects.TeamLancer
              connects you with like-minded professionals to build innovative
              solutions together.
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <button
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                onClick={() => {
                  handlePage();
                }}
              >
                Get Started
              </button>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WelcomePage;
