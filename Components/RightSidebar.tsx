import React from "react";
import { BsQuestionCircleFill } from "react-icons/bs";
import { FaNodeJs, FaPython, FaReact, FaVuejs } from "react-icons/fa";
import { RiNextjsFill } from "react-icons/ri";

function RightSidebar() {
  return (
    <div className="p-5">
      <div>
        <h1 className="text-2xl font-bold">Popular Questions</h1>
        <div className="mt-5 pl-3 space-y-5">
          <div className="flex items-center space-x-2">
            <span className="text-main text-xl">
              <BsQuestionCircleFill />
            </span>
            <span className="line-clamp-2 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic iure
              ad eaque illo pariatur, saepe excepturi distinctio earum eum
              repudiandae necessitatibus quas alias consequatur aperiam sed
              blanditiis magnam harum voluptatibus!
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-main text-xl">
              <BsQuestionCircleFill />
            </span>
            <span className="line-clamp-2 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic iure
              ad eaque illo pariatur, saepe excepturi distinctio earum eum
              repudiandae necessitatibus quas alias consequatur aperiam sed
              blanditiis magnam harum voluptatibus!
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-main text-xl">
              <BsQuestionCircleFill />
            </span>
            <span className="line-clamp-2 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic iure
              ad eaque illo pariatur, saepe excepturi distinctio earum eum
              repudiandae necessitatibus quas alias consequatur aperiam sed
              blanditiis magnam harum voluptatibus!
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-main text-xl">
              <BsQuestionCircleFill />
            </span>
            <span className="line-clamp-2 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic iure
              ad eaque illo pariatur, saepe excepturi distinctio earum eum
              repudiandae necessitatibus quas alias consequatur aperiam sed
              blanditiis magnam harum voluptatibus!
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-main text-xl">
              <BsQuestionCircleFill />
            </span>
            <span className="line-clamp-2 text-sm">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Hic iure
              ad eaque illo pariatur, saepe excepturi distinctio earum eum
              repudiandae necessitatibus quas alias consequatur aperiam sed
              blanditiis magnam harum voluptatibus!
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5">
        <h1 className="text-2xl font-bold">Popular Tags</h1>

        <div className="mt-5 pl-3 space-y-5">
          <div className="flex items-center space-x-2">
            <FaReact className="text-[#61DAFB] text-xl" />
            <span className="text-sm">React</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaNodeJs className="text-[#339933] text-xl" />
            <span className="text-sm">Node.js</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaVuejs className="text-[#42B883] text-xl" />
            <span className="text-sm">Vue.js</span>
          </div>

          <div className="flex items-center space-x-2">
            <RiNextjsFill className="text-black dark:text-white text-xl" />
            <span className="text-sm">Next.js</span>
          </div>

          <div className="flex items-center space-x-2">
            <FaPython className="text-[#3776AB] text-xl" />
            <span className="text-sm">Python</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RightSidebar;
