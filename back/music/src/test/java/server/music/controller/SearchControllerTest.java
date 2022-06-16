package server.music.controller;

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import server.music.search.controller.SearchController;

@WebMvcTest(SearchController.class)
class SearchControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @MockBean
    private SearchController searchController;

    // @Test
    // public void SpotifyApi_Bean_등록()throws Exception{
    //     //given
    //     SearchForm searchForm = new SearchForm();
    //     searchForm.setKeyword("s");
    //     //when
    //     ResultActions result = mockMvc.perform(get("/search")
    //             .contentType(MediaType.APPLICATION_JSON)
    //             .content(objectMapper.writeValueAsString(searchForm)));
    //     //then
    //     MvcResult mvcResult = result.andReturn();
    //     String contentAsString = mvcResult.getResponse().getContentAsString();
    //     System.out.println("contentAsString = " + contentAsString);
    // }
}