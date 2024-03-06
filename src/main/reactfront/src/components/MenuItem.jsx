import styled from "styled-components";

const Box = styled.div`

    display: flex;
    width: 100%;
    height: 20vw;
    left: 99px;
    top: 484px;
    margin:0 auto;

    background: #F4F2F2;
    border-radius: 30px;
    border-top: 1px solid #dee2e6;

    //컴포넌트간 간격
    & {
        border-top: 1px solid #dee2e6;
        margin-bottom:3vh;
    }
`;

const Thumbnail = styled.div`
        margin-right: 3vw;
        img {
            margin-top:3vw;
            margin-left:3vw;
            border-radius: 20px;
            display:block;
            width: 20vw;
            height:13vw;
            object-fit: cover;
        }
    `;

const Content = styled.div`
        p {
            margin:0;
            margin-top:3vw;
            margin-left:3vw;
            white-space: normal;
            font-family: 'IBM Plex Mono';
            font-style: normal;
            font-weight: 700;
            font-size: 6vw;
            line-height: 1.5rvw;
        }
    `;



const MenuItem = ({food}) => {
    const { id, foodimagepath, foodname, caption } = food;

    console.log("food:", food);

    return (
        <Box>
            <div className="thumbnail">
                <div key={id}>
                <img src={foodimagepath} alt={caption} />
                </div>
            </div>
            <div className="content">
                <p>{foodname}</p>
            </div>
        </Box>
    );
};
export default MenuItem;