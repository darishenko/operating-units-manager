package com.rnpc.operatingunit.exception.operatingRoom;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
@AllArgsConstructor
public class OperatingRoomNameDuplicateException extends RuntimeException {
    private String name;
}