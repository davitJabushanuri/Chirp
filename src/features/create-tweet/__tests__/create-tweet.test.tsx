// import { render, screen } from "@testing-library/react";
// import userEvent from "@testing-library/user-event";

// import { CreateTweet } from "../components/create-tweet";

// jest.mock("next-auth/react", () => {
//   const originalModule = jest.requireActual("next-auth/react");
//   const mockSession = {
//     expires: new Date(Date.now() + 2 * 86400).toISOString(),
//     user: { username: "admin" },
//   };
//   return {
//     __esModule: true,
//     ...originalModule,
//     useSession: jest.fn(() => {
//       return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
//     }),
//   };
// });

// jest.mock("react-query", () => ({
//   useQuery: () => ({ isLoading: false, error: {}, data: [] }),
// }));

// describe("CreateTweet", () => {
//   it("updates the text value when the user types in the text area", () => {
//     render(<CreateTweet />);

//     const textarea = screen.getByRole("textarea");
//     userEvent.type(textarea, "Hello World");

//     expect(textarea).toHaveValue("Hello World");
//   });
// });
