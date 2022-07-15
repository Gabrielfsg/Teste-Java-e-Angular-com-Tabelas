package com.example.backend.model;

import com.fasterxml.jackson.annotation.*;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@Table(name = "venda")
public class Venda {

    @Id
    @EqualsAndHashCode.Include
    @JsonProperty("id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dataVenda")
    private LocalDateTime dataVenda;

    @Column(name = "total")
    private Float total;

    @Column(name = "status")
    private boolean status;

    @OneToMany(mappedBy = "venda", cascade = CascadeType.ALL)
    private List<VendaProduto> vendaProduto = new ArrayList<>();
}
