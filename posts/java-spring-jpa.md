---
title: 'Spring Boot - JPA'
date: '2022-11-26'
tag: 'Java'
description: 'spring boot와 JPA 이용하여 간단한 CRUD 구현'
---

> 환경 설정

- Spring boot v2.6.2
- Web
- lombok
- JPA
- mustache
- H2 database

#### IntelliJ IDE 사용

## 파일 구조

#### `java`

- api
- controller
- dto
- entity
- repository
- service

#### `view`

- mustache 이용하여 작업 `resources` > `templates` 하위 폴더
  - articles
  - comments
  - layouts

### 각 파일 구조에 대한 기능

1. api : Restfull API 컨트롤러 기능 수행

```java

@RestController
public class ArticleApiController {

    @Autowired // DI
    private ArticleService articleService;

    // Get
    @GetMapping("/api/articles")
    public List<Article> index() {
        return articleService.index();
    }

    @GetMapping("/api/articles/{id}")
    public Article show(@PathVariable Long id) {
        return articleService.show(id);
    }

    // Post
    @PostMapping("/api/articles")
    public ResponseEntity<Article> create(@RequestBody ArticleForm dto) {
        Article created = articleService.created(dto);
        return (created != null) ? ResponseEntity.status(HttpStatus.OK).body(created) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // Update
    @PatchMapping("/api/articles/{id}")
    public ResponseEntity<Article> update(@PathVariable Long id, @RequestBody ArticleForm dto) {

        Article updated = articleService.update(id, dto);
        return (updated != null) ? ResponseEntity.status(HttpStatus.OK).body(updated) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // Delete
    @DeleteMapping("/api/articles/{id}")
    public ResponseEntity<Article> delete(@PathVariable long id) {

        Article deleted = articleService.delete(id);
        return (deleted != null) ? ResponseEntity.status(HttpStatus.NO_CONTENT).build() :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

    // 트랜잭션 -> 실패 -> 롤백
    @PostMapping("/api/transition-test")
    public ResponseEntity<List<Article>> transitionTest(@RequestBody List<ArticleForm> dtos) {
        List<Article> createdList = articleService.createArticles(dtos);
        return (createdList != null) ? ResponseEntity.status(HttpStatus.OK).body(createdList) :
                ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
    }

}
```

`API`를 다루는 클래스는 `@RestController` 어노테이션을 반드시 달아주어야 한다. 그리고 `api method`에 따라, `@GetMapping`, `@PostMapping` 등의 어노테이션을
달아준다.  
맵핑 URL 부분에 {id} 와 같이 값을 전달 받을 때에는 `@PathVariable`를 사용하며,
`body`로 부터 데이터를 전달 받을 때는 `@RequestBody`로 선언해주면 된다. 결과적으로 값을 받아와서 리턴해주는 역할을 진행하고 데이터 처리같은 세부적인 일은 `service`에 위임한다.

2. controller : api 처리 로직 외의 역할을 하고 있다.

맵핑 URL에 따라 값을 전달 받고 뷰 페이지에 리턴하는 역할을 한다.

```java

@Controller
@Slf4j
public class ArticleController {

    @Autowired // 스프링 부트가 미리 생성해놓은 객체를 가져다가 자동 연결
    private ArticleRepository articleRepository;

    @Autowired
    private CommentService commentService;

    @GetMapping("/articles/new")
    public String newArticleForm() {
        return "articles/new";
    }

    @PostMapping("/articles/create")
    public String createArticle(ArticleForm form) {
//        System.out.println(form.toString()); // logging 기능으로 대체
        log.info(form.toString());
        // 1. DTO 를 변환! Entity로
        Article article = form.toEntity();
        log.info(article.toString());

        // 2. Repository에게 Entity를 DB안에 저장하게 함
        Article saved = articleRepository.save(article);
        log.info(saved.toString());

        return "redirect:/articles/" + saved.getId();

        // DTO -> Controller -> Entity -> Repository -> save
    }

    @GetMapping("/articles/{id}")
    public String show(@PathVariable Long id, Model model) {

        // 1. id 가져옴
        Article articleEntity = articleRepository.findById(id).orElse(null);
        List<CommentDto> commentDtos = commentService.comments(id);
        // 2. 가져온 데이터를 모델에 등록
        model.addAttribute("article", articleEntity);
        model.addAttribute("commentDtos", commentDtos);
        // 3. 보여줄 페이지 설정
        return "articles/show";
    }

    @GetMapping("/articles")
    public String index(Model model) {
        // 1. 모든 Article을 가져온다.
        List<Article> articleEntityList = articleRepository.findAll();
        // 2. 가져온 아티클 묶음을 뷰로 전달
        model.addAttribute("articleList", articleEntityList);
        // 3. 뷰 페이지 설정
        return "articles/index";
    }

    @GetMapping("/articles/{id}/edit")
    public String edit(@PathVariable Long id, Model model) {
        // 수정 할 데이터 가져오기
        Article articleEntity = articleRepository.findById(id).orElse(null);

        model.addAttribute("article", articleEntity);
        // view page
        return "articles/edit";
    }

    @PostMapping("/articles/update")
    public String update(ArticleForm form) {
        // 1. DTO => entity
        Article articleEntity = form.toEntity();
        // 2. 엔티티를 디비에 저장
        // 2-1. 디비에서 기존 데이터 가져오기
        Article target = articleRepository.findById(articleEntity.getId()).orElse(null);
        // 2-2. 기존 데이터가 있다면 값을 갱신
        if (target != null) {
            articleRepository.save(articleEntity);
        }
        // 수정 결과 페이지를 리다이렉트
        return "redirect:/articles/" + articleEntity.getId();
    }

    @GetMapping("/articles/{id}/delete")
    public String delete(@PathVariable Long id, RedirectAttributes rttr) {
        // 1. 삭제 대상 가져온다
        Article target = articleRepository.findById(id).orElse(null);
        // 2. 대상을 삭제한다
        if (target != null) {
            articleRepository.delete(target);
            rttr.addFlashAttribute("msg", "삭제가 완료되었습니다.");
        }
        // 3. 리다이렉트
        return "redirect:/articles";
    }
}
```

어노테이션 부터 살펴보면,

- `@Controller` : 컨트롤러 클래스에 반드시 선언
- `@Slf4j` : 로그 정보를 확인한다. `System.out.println()` 보다 안정성이 좋다.  
  ex) `log.info(form.toString());`
- `@Autowired` : DI 의존성 주입

플로우는 보통 데이터를 가지고 와서 `model`에 담아 보여줄 페이지에서 꺼내 쓴다고 생각하면 된다.

3. DTO : `Data Trasfer Object`(VO로 불리기도 함) 약자로 정보를 보관하거나 전달하는 역할을 한다.

```java

@AllArgsConstructor
@NoArgsConstructor
@Getter
@ToString
public class CommentDto {

    private Long id;

    @JsonProperty("article_id")
    private Long articleId;

    private String nickname;
    private String body;

    public static CommentDto createCommentDto(Comment comment) {

        return new CommentDto(
                comment.getId(),
                comment.getArticle().getId(),
                comment.getNickname(),
                comment.getBody()
        );
    }
}
```

`lombok` 이용하여 간결하게 어노테이션을 선언하는 걸로 끝낼 수 있다.  
@JsonProperty("article_id")  
private Long articleId;  
위 코드의 어노테이션은 `article_id`를 받아와 `articleId` 로 사용한다는 내용이다.

4. Entity : 테이블에 대응하는 하나의 클래스
   `JPA` 의존성을 추가하고 `@Entiy` 어노테이션을 붙이면 테이블과 자바 클래스가 매핑이 되고,
   `JPA`에서 '하나의 엔티티 타입을 생성한다'라는 의미는 '하나의 클래스를' 작성한다는 의미가 된다. 쉽게 말해 디비가 알아먹을 수 있도록 변환한다.라고 생각하면 될거 같다

```java

@Entity // DB가 해당 객체 인식하도록 선언
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class Article {

    @Id // 대표 값을 지정 예) 주민등록번호
    @GeneratedValue(strategy = GenerationType.IDENTITY) // 자동 생성 어노테이션
    private Long id;

    @Column
    private String title;
    @Column
    private String content;


    public void patch(Article article) {
        if (article.title != null) {
            this.title = article.title;
        }
        if (article.content != null) {
            this.content = article.content;
        }
    }
}

```

5. Repository : 스프링 부트에서 지원하는 프레임워크 인터페이스며 CRUD 기능을 도와준다

```java
public interface ArticleRepository extends CrudRepository<Article, Long> {

    @Override
    ArrayList<Article> findAll();
}

///
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // 특정 게시글 모든 댓글 조회
    @Query(value = "SELECT * FROM comment WHERE article_id = :articleId", nativeQuery = true)
    List<Comment> findByArticleId(Long articleId);

    // 특정 닉네임의 모든 댓글 조회
    List<Comment> findByNickname(String nickname);
}
```

crud 관련 역할 수행하며, 오버라이딩 또는 쿼리 어노테이션을 넣어 작업할 수 있다.
`JpaRepository`는 `pagination` or `sort`, `query` 역할을 상속받고 있다.(해당 클래스 들어가보면 확인 가능)
`findByNickname` 은 `xml` 파일을 만들어 작업을 진행하였다. `resource > META-INF > orm.xml`

```xml
<?xml version="1.0" encoding="utf-8"?>
<entity-mappings xmlns="http://java.sun.com/xml/ns/persistence/orm"
                 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                 xsi:schemaLocation="http://java.sun.com/xml/ns/persistence/orm
        http://java.sun.com/xml/ns/persistence/orm_2_0.xsd" version="2.0">

    <named-native-query name="Comment.findByNickname" result-class="com.example.app.entity.Comment">
        <query>
            <![CDATA[
            SELECT
                   *
            FROM
                 comment
            WHERE
                  nickname = :nickname
                ]]>
        </query>
    </named-native-query>

</entity-mappings>
```

6. Service : Repository 통해 DB 작업을 한다.

```java

@Service
public class ArticleService {

    @Autowired
    private ArticleRepository articleRepository;

    public List<Article> index() {
        return articleRepository.findAll();
    }

    public Article show(Long id) {
        return articleRepository.findById(id).orElse(null);
    }

    public Article created(ArticleForm dto) {
        Article article = dto.toEntity();
        if (article.getId() != null) {
            return null;
        }
        return articleRepository.save(article);
    }

    public Article update(Long id, ArticleForm dto) {
        // 1. 수정용 엔티티 생성
        Article article = dto.toEntity();
        // 2. 대상 엔티티 조회
        Article target = articleRepository.findById(id).orElse(null);
        // 3. 잘못된 요청 처리
        if (target == null || id != article.getId()) {
            return null;
        }
        // 4. 업데이트
        target.patch(article);
        return articleRepository.save(target);

    }

    public Article delete(long id) {
        // 1. 대상 찾기
        Article target = articleRepository.findById(id).orElse(null);
        // 2. 예외 처리
        if (target == null) {
            return null;
        }
        return target;
    }

    @Transactional // 실패 할 경우 롤백
    public List<Article> createArticles(List<ArticleForm> dtos) {
        // 1. dto묶음을 엔티티로 변환
        List<Article> articleList = dtos.stream().map(dto -> dto.toEntity()).collect(Collectors.toList());
        // 2. 엔티티 묶음을 디비로 저장
        articleList.stream().forEach(article -> articleRepository.save(article));
        // 3. 강제 예외 발생
        articleRepository.findById(-1L).orElseThrow(() -> new IllegalArgumentException("실패!~!"));
        // 4. 결과 값 반환
        return articleList;


    }
}
```

서비스 클래스는 `@Service` 어노테이션을 붙여야 한다. 컨트롤러부터 전달 받은 값으로 DB 작업을 진행한 후 결과 값을 리턴한다.  
`@Transactional` 어노테이션은 데이터 작업이 실패 할 경우 리턴한다.

7. view(mustache) : 사용자에게 보여줄 페이지이며, `mustache`를 이용하면 `react`의 컴포넌트 처럼 단위 별로 작업을 진행 할 수 있어, 유지보수에 좋을 거 같다.

resource > templates > mustache

```html
{{>layouts/header}}
<table class="table">
  <thead>
    <tr>
      <th scope="col">Id</th>
      <th scope="col">Title</th>
      <th scope="col">Content</th>
    </tr>
  </thead>
  <tbody>
    {{#articleList}}
    <tr>
      <th>{{id}}</th>
      <td><a href="articles/{{id}}">{{title}}</a></td>
      <td>{{content}}</td>
    </tr>

    {{/articleList}}
  </tbody>
</table>
<a href="/articles/new">create article</a>

{{>layouts/footer}}
```

`header`, `footer` 부분을 따로 작업 한 후 불러와 작업을 한 예시이며, `{{#articleList}}`은
`controller`의 `model`에 담아있는 데이터이며 #을 붙이면 반복하여 작업을 진행한다.

8. properties

```properties
# h2 DB, 웹 콘솔 접근 허용
spring.h2.console.enabled=true
spring.jpa.defer-datasource-initialization=true
# JPA 로깅 설정
# 디버그 레벨로 쿼리 출력
logging.level.org.hibernate.sql=debug
# 이쁘게 보여주기
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
# 파라미터 보여주기
logging.level.org.hibernate.type.descriptor.sql.BasicBinder=trace
# DB URL 고정 설정
# 유니크 URL 생성 x
spring.datasource.generate-unique-name=false
# 고정 URL 확인
# spring.datasource.url=jdbc:h2:mem:testdb

# mysql
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.datasource.url=jdbc:mysql://localhost:3306/firstTest
spring.datasource.username=root
spring.datasource.password=root1234

spring.sql.init.data-locations=classpath:/data.sql
spring.sql.init.mode=never
spring.jpa.hibernate.ddl-auto=update
```

작업을 수월하게 진행할 수 있도록 설정한 내용들
